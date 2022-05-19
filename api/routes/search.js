/* Import modules. */
const Airtable = require('airtable')
const moment = require('moment')
const superagent = require('superagent')
const util = require('util')

/* Set refresh delay. */
const SECONDS_TO_REFRESH = 30

/* Set refresh delay. */
// FIXME: Set to the maximum supported by Airtable
const MAX_RECORDS = 10000

/**
 * Search Module
 */
const search = async function (req, res) {
    /* Set index. */
    const index = req.params.index
    // console.log('INDEX', index)

    /* Set query. */
    const query = req.params.query
    // console.log('QUERY', query)

    /* Set zoom. */
    const zoom = req.params.zoom
    // console.log('ZOOM', zoom)

    /* Set category. */
    const category = req.query.cat || 'atm'

    /* Initialize endpoint. */
    let endpoint

    /**
     * Handle Map Search
     *
     * Uses latitude, longitude and zoom to calculate map view.
     */
    // if (zoom) {
    //     /* Set index. */
    //     // TODO: Add support for multiple indexes.
    //     const index = 'coinmap'
    //
    //     /* Set endpoint. */
    //     endpoint = `http://127.0.0.1:9200/${index}/_search`
    //
    //     /* Set latitude. */
    //     const lat = parseFloat(req.params.lat)
    //
    //     /* Set longitude. */
    //     const lng = parseFloat(req.params.lng)
    //
    //     let offset
    //     if (zoom >= 12) {
    //         offset = 0.1
    //     } else {
    //         offset = 1.0
    //     }
    //
    //     let dslQuery
    //
    //     /* Validate category. */
    //     if (category) {
    //         /* Build DSL query. */
    //         dslQuery = {
    //             from: 0,
    //             size: 10000,
    //             query: {
    //                 bool: {
    //                     must: [
    //                         {
    //                             range: {
    //                                 lat: {
    //                                     gte: (lat - offset).toFixed(7),
    //                                     lte: (lat + offset).toFixed(7)
    //                                 }
    //                             }
    //                         },
    //                         {
    //                             range: {
    //                                 lon: {
    //                                     gte: (lng - offset).toFixed(7),
    //                                     lte: (lng + offset).toFixed(7)
    //                                 }
    //                             }
    //                         },
    //                         {
    //                             term: {
    //                                 category
    //                             }
    //                         },
    //                     ],
    //                     must_not: [
    //                         {
    //                             exists: {
    //                                 field: 'isDeleted'
    //                             }
    //                         }
    //                     ]
    //                 }
    //             }
    //         }
    //     } else {
    //         /* Build DSL query. */
    //         dslQuery = {
    //             from: 0,
    //             size: 10000,
    //             query: {
    //                 bool: {
    //                     should: [
    //                         {
    //                             range: {
    //                                 lat: {
    //                                     gte: (lat - offset).toFixed(7),
    //                                     lte: (lat + offset).toFixed(7)
    //                                 }
    //                             }
    //                         },
    //                         {
    //                             range: {
    //                                 lon: {
    //                                     gte: (lng - offset).toFixed(7),
    //                                     lte: (lng + offset).toFixed(7)
    //                                 }
    //                             }
    //                         },
    //                     ],
    //                     must_not: [
    //                         {
    //                             exists: {
    //                                 field: 'isDeleted'
    //                             }
    //                         }
    //                     ]
    //                 }
    //             }
    //         }
    //     }
    //     console.log('DSL QUERY', util.inspect(dslQuery, false, null, true))
    //
    //     /* Request Elasticsearch query. */
    //     const response = await superagent
    //         .post(endpoint)
    //         .send(dslQuery)
    //         .set('accept', 'json')
    //     // console.log('RESPONSE', response)
    //
    //     /* Initialize body. */
    //     let body
    //
    //     /* Validate body. */
    //     if (response.body) {
    //         /* Set response body. */
    //         body = response.body
    //     } else {
    //         /* Validate response text. */
    //         if (!response.text) {
    //             return
    //         }
    //
    //         try {
    //             /* Parse response text. */
    //             body = JSON.parse(response.text)
    //         } catch (err) {
    //             console.error(err)
    //         }
    //     }
    //
    //     let hits
    //
    //     /* Validate body. */
    //     if (body) {
    //         hits = body.hits.hits
    //     }
    //
    //     const pkg = {
    //         lat,
    //         lng,
    //         zoom,
    //         hits,
    //     }
    //
    //     /* Return JSON. */
    //     return res.json(pkg)
    // } // end map search handler

    /* Validate query. */
    if (!query) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'Missing query parameter.'
        })
    }

    /* Initialize fields. */
    // NOTE: Used by multi_match.
    let fields

    /* Set (search) type. */
    const type = 'phrase_prefix'

    /* Set endpoint. */
    if (index) {
        /* Set endpoint. */
        endpoint = `http://127.0.0.1:9200/coinmap/_search`

        switch(index) {
        case 'contractors':
            fields = ['email', 'firstName', 'lastName']
            break
        case 'coinmap':
            fields = ['name', 'companyName', 'streetAddress', 'neighborhood', 'city', 'state']
            break
        case 'people':
            fields = ['email', 'firstName', 'lastName']
            break
        }
    } else {
        endpoint = `http://127.0.0.1:9200/coinmap/_search`

        fields = ['name', 'companyName', 'streetAddress', 'neighborhood', 'city', 'state']
    }

    /* Build DSL query. */
    // const dslQuery = {
    //     query: {
    //         multi_match: { fields, query, type }
    //     }
    // }
    let dslQuery = {
        query: {
            bool: {
                must: [
                    {
                        multi_match: { fields, query, type }
                    },
                    {
                        term: {
                            category
                        }
                    },
                ],
                must_not: [
                    {
                        exists: {
                            field: 'isDeleted'
                        }
                    }
                ]
            }
        }
    }
    // console.log('DSL QUERY (coinmap)', util.inspect(dslQuery, false, null, true))

    /* Request Elasticsearch query. */
    let response = await superagent
        .post(endpoint)
        .send(dslQuery)
        .set('accept', 'json')
    // console.log('RESPONSE', util.inspect(response.body, false, null, true))

    /* Initialize body. */
    let coinmap

    /* Validate coinmap. */
    if (response.body) {
        /* Set response body. */
        coinmap = response.body
    } else {
        /* Validate response text. */
        if (!response.text) {
            return
        }

        try {
            /* Parse response text. */
            coinmap = JSON.parse(response.text)
        } catch (err) {
            console.error(err)
        }
    }

    /* Validate coinmap. */
    if (coinmap) {
        /* Set (search request) hits. */
        const hits = coinmap.hits

        /* Validate hits. */
        if (hits.hits) {
            coinmap = hits.hits
        }
    }

    endpoint = `http://127.0.0.1:9200/merchants/_search`

    dslQuery = {
        query: {
            bool: {
                must: [
                    {
                        multi_match: { fields, query, type }
                    },
                ],
                must_not: [
                    {
                        exists: {
                            field: 'isDeleted'
                        }
                    }
                ]
            }
        }
    }
    // console.log('DSL QUERY (merchants)', util.inspect(dslQuery, false, null, true))

    /* Request Elasticsearch query. */
    response = await superagent
        .post(endpoint)
        .send(dslQuery)
        .set('accept', 'json')
    // console.log('RESPONSE', response)

    /* Initialize body. */
    let merchants

    /* Validate body. */
    if (response.body) {
        /* Set response body. */
        merchants = response.body
    } else {
        /* Validate response text. */
        if (!response.text) {
            return
        }

        try {
            /* Parse response text. */
            merchants = JSON.parse(response.text)
        } catch (err) {
            console.error(err)
        }
    }

    /* Validate merchants. */
    if (merchants) {
        /* Set (search request) hits. */
        const hits = merchants.hits

        /* Validate hits. */
        if (hits.hits) {
            merchants = hits.hits
        }
    }

    const body = [
        ...merchants,
        ...coinmap,
    ]

    /* Return cached data. */
    res.json(body)
}

/* Export module. */
module.exports = search
