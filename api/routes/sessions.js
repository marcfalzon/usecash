/* Import modules. */
const moment = require('moment')
const superagent = require('superagent')
const { v4: uuidv4 } = require('uuid')

/**
 * Sessions Module
 */
const sessions = async function (req, res) {
    // let source
    //
    // if (req.params) {
    //     source = req.params.source
    // }
    //
    // if (source) {
    //     /* Handle source. */
    //     switch(source) {
    //     case 'contractors':
    //         return require('./admin/contractors')(req, res)
    //     case 'sessions':
    //         return require('./admin/sessions')(req, res)
    //     case 'people':
    //         return require('./admin/people')(req, res)
    //     }
    //
    //     return res.json({
    //         error: `no handler found for [ ${source} ]`,
    //     })
    // }

    if (req.method === 'GET') {
        let endpoint = `http://127.0.0.1:9200/sessions/_search`
        console.log('ENDPOINT', endpoint)

        const dslQuery = {
            query: {
                // match: { id }
                match_all: {}
            }
        }
        console.log('\nDSL QUERY', dslQuery)

        /* Request Elasticsearch query. */
        let response = await superagent
            .post(endpoint)
            .send(dslQuery)
            .set('accept', 'json')
        console.log('\nRESPONSE', response.body)

        const hits = response.body.hits.hits
        console.log('\nHITS', hits)

        const source = hits[0]._source
        console.log('\nSOURCE', source)

        /* Aggregate results from hits. */
        const results = hits.map(hit => {
            return hit._source
        })

        /* Return results. */
        return res.json(results)

    } else if (req.method === 'POST') {
        console.log('BODY', req.body)

        const body = req.body
        console.log('BODY', body)

        const id = uuidv4()
        console.log('ID', id)

        const profileid = body.profileid

        const createdAt = moment().unix()

        const updatedAt = null

        /* Build session object. */
        const session = {
            id,
            profileid,
            createdAt,
            updatedAt,
        }

        /* Set endpoint. */
        const endpoint = `http://127.0.0.1:9200/sessions/_doc/${session.id}`
        // console.log('ENDPOINT', endpoint)

        /* Request Elasticsearch query. */
        response = await superagent
            .put(endpoint)
            .send(session)
            .set('accept', 'json')
            .catch(err => console.error(err))
        console.log('\nSESSIONS ADD/UPDATE', response.body)


        return res.json(response.body)
    } else {
        return res.end('done!')

    }

    /* Return cached data. */
    // res.json(cache)
}

/* Export module. */
module.exports = sessions
