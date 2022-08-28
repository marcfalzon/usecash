/* Import modules. */
const moment = require('moment')
const superagent = require('superagent')
const util = require('util')

/* Initialize cache. */
let cache = {}

/**
 * Auto Complete
 */
const autoComplete = async function (req, res) {
    /* Set query. */
    const query = req.params.query
    console.log('QUERY', query)

    /* Validate query. */
    if (!query) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'Missing query parameter.'
        })
    }

    let category
    let index
    let type
    let response
    let body
    let dslQuery
    let hits

    /* Initialize fields. */
    // NOTE: Used by multi_match.
    let fields

    /* Set index. */
    index = 'coinmap'

    /* Set (search) type. */
    type = 'phrase_prefix'

    /* Set endpoint. */
    endpoint = `http://127.0.0.1:9200/${index}/_search`

    /* Set fields. */
    fields = ['name', 'companyName', 'streetAddress', 'neighborhood', 'city', 'state']

    // category = 'atm'

    /* Build DSL query. */
    // const dslQuery = {
    //     from: 0,
    //     size: 15,
    //     query: {
    //         multi_match: { fields, query, type }
    //     }
    // }
    dslQuery = {
        from: 0,
        size: 15,
        query: {
            bool: {
                must: [
                    {
                        multi_match: { fields, query, type }
                    },
                    // {
                    //     term: {
                    //         category
                    //     }
                    // },
                ],
            }
        }
    }
    console.log('DSL QUERY', util.inspect(dslQuery, false, null, true))

    /* Request Elasticsearch query. */
    response = await superagent
        .post(endpoint)
        .send(dslQuery)
        .set('accept', 'json')
    // console.log('RESPONSE', response)

    /* Validate body. */
    if (response.body) {
        /* Set response body. */
        body = response.body
    } else {
        /* Validate response text. */
        if (!response.text) {
            return
        }

        try {
            /* Parse response text. */
            body = JSON.parse(response.text)
        } catch (err) {
            console.error(err)
        }
    }

    hits = body.hits.hits
    console.log('HITS', hits)

    // /* Set index. */
    // index = 'merchants'
    //
    // /* Set (search) type. */
    // type = 'phrase_prefix'
    //
    // /* Set endpoint. */
    // endpoint = `http://127.0.0.1:9200/${index}/_search`
    //
    // /* Set fields. */
    // fields = ['name', 'companyName', 'streetAddress', 'neighborhood', 'city', 'state']
    //
    // /* Build DSL query. */
    // dslQuery = {
    //     from: 0,
    //     size: 15,
    //     query: {
    //         multi_match: { fields, query, type }
    //     }
    // }
    // console.log('DSL QUERY', util.inspect(dslQuery, false, null, true))
    //
    // /* Request Elasticsearch query. */
    // response = await superagent
    //     .post(endpoint)
    //     .send(dslQuery)
    //     .set('accept', 'json')
    // // console.log('RESPONSE', response)
    //
    // /* Validate body. */
    // if (response.body) {
    //     /* Set response body. */
    //     body = response.body
    // } else {
    //     /* Validate response text. */
    //     if (!response.text) {
    //         return
    //     }
    //
    //     try {
    //         /* Parse response text. */
    //         body = JSON.parse(response.text)
    //     } catch (err) {
    //         console.error(err)
    //     }
    // }

    /* Validate body. */
    if (body) {
        /* Set (search request) hits. */
        const hits = body.hits

        /* Validate hits. */
        if (hits.hits) {
            body = hits.hits
        }
    }

    // hits = [
    //     ...hits,
    //     ...body,
    // ]

    /* Initialize package. */
    let pkg = {}

    /* Initialize keywords. */
    pkg.keywords = []

    /* Add keywords. */
    body.forEach(hit => {
        if (hit._source.name || hit._source.companyName) {
            pkg.keywords.push(hit._source.name || hit._source.companyName)
        }
    })

    /* Remove duplicates. */
    if (pkg.keywords.length) {
        pkg.keywords = [...new Set(pkg.keywords)]
    }

    pkg.locations = [
        'Canada',
        'Quebec',
    ]

    // pkg.hits = body
    pkg.hits = hits

    /* Return package. */
    res.json(pkg)
}

/* Export module. */
module.exports = autoComplete
