/* Import modules. */
const moment = require('moment')
const superagent = require('superagent')
const util = require('util')

/* Initialize cache. */
let cache = {}

/**
 * Map Bounds
 */
const mapBounds = async function (req, res) {
    /* Set body. */
    let body = req.body
    console.log('BODY', body, typeof body)

    /* Validate query. */
    if (!body) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'Missing request body.'
        })
    }

    /* Initialize endpoint. */
    let endpoint

    /* Set index. */
    const index = 'coinmap'

    /* Set endpoint. */
    endpoint = `http://127.0.0.1:9200/${index}/_search`

    /* Set north-east. */
    const ne = body.bounds.ne
    // console.log('NORTH-EAST', ne)

    /* Set south-west. */
    const sw = body.bounds.sw
    // console.log('SOUTH-WEST', sw)

    /* Set category. */
    const category = body.cat

    let dslQuery

    if (category && category !== '') {
        /* Build DSL query. */
        dslQuery = {
            from: 0,
            size: 10000,
            query: {
                bool: {
                    must: [
                        {
                            range: {
                                lat: {
                                    gte: parseFloat(sw.lat),
                                    lte: parseFloat(ne.lat)
                                }
                            }
                        },
                        {
                            range: {
                                lng: {
                                    gte: parseFloat(sw.lng),
                                    lte: parseFloat(ne.lng)
                                }
                            }
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
    } else {
        /* Build DSL query. */
        dslQuery = {
            from: 0,
            size: 10000,
            query: {
                bool: {
                    must: [
                        {
                            range: {
                                lat: {
                                    gte: parseFloat(sw.lat),
                                    lte: parseFloat(ne.lat)
                                }
                            }
                        },
                        {
                            range: {
                                lng: {
                                    gte: parseFloat(sw.lng),
                                    lte: parseFloat(ne.lng)
                                }
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
    }
    console.log('DSL QUERY (coinmap)', util.inspect(dslQuery, false, null, true))
    // console.log('COINMAP QUERY', JSON.stringify(dslQuery));

    /* Request Elasticsearch query. */
    let response = await superagent
        .post(endpoint)
        .send(dslQuery)
        .set('accept', 'json')
    // console.log('RESPONSE', response)

    let coinmap

    /* Validate body. */
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

    /* Build DSL query. */
    dslQuery = {
        from: 0,
        size: 10000,
        query: {
            bool: {
                must: [
                    {
                        range: {
                            lat: {
                                gte: parseFloat(sw.lat),
                                lte: parseFloat(ne.lat)
                            }
                        }
                    },
                    {
                        range: {
                            lng: {
                                gte: parseFloat(sw.lng),
                                lte: parseFloat(ne.lng)
                            }
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
    console.log('DSL QUERY (merchants)', util.inspect(dslQuery, false, null, true))

    // /* Request Elasticsearch query. */
    // response = await superagent
    //     .post(endpoint)
    //     .send(dslQuery)
    //     .set('accept', 'json')
    //     .catch(err => console.error(err))
    // // console.log('RESPONSE', response)
    //
    // let merchants
    //
    // /* Validate body. */
    // if (response.body) {
    //     /* Set response body. */
    //     merchants = response.body
    //     // console.log('MERCHANTS', merchants)
    // } else {
    //     /* Validate response text. */
    //     if (!response.text) {
    //         return
    //     }
    //
    //     try {
    //         /* Parse response text. */
    //         merchants = JSON.parse(response.text)
    //     } catch (err) {
    //         console.error(err)
    //     }
    // }
    //
    // /* Validate coinmap. */
    // if (merchants) {
    //     /* Set (search request) hits. */
    //     const hits = merchants.hits
    //
    //     /* Validate hits. */
    //     if (hits.hits) {
    //         merchants = hits.hits
    //     }
    // }

    // let hits
    //
    // /* Validate body. */
    // if (body) {
    //     hits = body.hits.hits
    // }
    //
    // const pkg = {
    //     // lat,
    //     // lng,
    //     // zoom,
    //     hits,
    // }

    // console.log('MERCHANTS', merchants.length)
    console.log('COINMAP', coinmap.length)

    body = [
        // ...merchants,
        ...coinmap,
    ]

    /* Return JSON. */
    return res.json(body)

}

/* Export module. */
module.exports = mapBounds
