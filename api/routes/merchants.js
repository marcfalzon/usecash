/* Import modules. */
const { Magic } = require('@magic-sdk/admin')
const moment = require('moment')
const PouchDB = require('pouchdb')
const superagent = require('superagent')
const util = require('util')
const { v4: uuidv4 } = require('uuid')

const mAdmin = new Magic('sk_live_???')

/* Initialize databases. */
const merchantsDb = new PouchDB('http://api:???@localhost:5984/merchants')
const logsDb = new PouchDB('http://api:???@localhost:5984/logs')

/**
 * Merchants Module
 */
const merchants = async function (req, res) {
    const body = req.body
    console.log('BODY', body)

    /* Validate body. */
    if (body) {
        const id = uuidv4()
        const createdAt = moment().unix()

        const pkg = {
            _id: id,
            src: 'magic',
            ...body,
            createdAt,
        }

        results = await logsDb.put(pkg)
            .catch(err => console.error('LOGS ERROR:', err))
    }


    if (req.method === 'GET') {
        let endpoint = `http://127.0.0.1:9200/coinmap/_search`
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
        /* Initialize email. */
        let email

        /* Set headers. */
        const headers = req.headers

        /* Validate headers. */
        if (headers) {
            /* Set authorization. */
            const authorization = headers.authorization

            /* Validate authorization. */
            if (!authorization) {
                /* Set status. */
                res.status(401)

                /* Return error. */
                return res.json({
                    error: 'You MUST provide authorization.'
                })
            }

            /* Retrieve token. */
            const token = authorization.split(' ')[1]
            // console.log('RECEIVED TOKEN', token)

            /* Validate token. */
            if (!token) {
                /* Set status. */
                res.status(400)

                /* Return error. */
                return res.json({
                    error: 'You MUST provide a DID token.'
                })
            }

            /* Set issuer. */
            const issuer = mAdmin.token.getIssuer(token)

            /* Validate issuer. */
            if (!issuer) {
                /* Set status. */
                res.status(400)

                /* Return error. */
                return res.json({
                    error: 'Could NOT retrieve this issuer.'
                })
            }

            /* Set issuer metadata. */
            const metadata = await mAdmin.users.getMetadataByIssuer(issuer)
            // console.log('MAGIC LOGIN (data):', JSON.stringify(metadata, null, 4))

            /* Validate metadata. */
            if (!metadata) {
                /* Set status. */
                res.status(400)

                /* Return error. */
                return res.json({
                    error: 'Could NOT retrieve the email for this issuer.'
                })
            }

            /* Set email address. */
            email = metadata.email
            // console.log('MAGIC LOGIN (email):', email)

            /* Validate email. */
            if (!email) {
                /* Set status. */
                res.status(401)

                /* Return error. */
                return res.json({
                    error: 'Unauthorized user.'
                })
            }

        }

        /* Set merchant. */
        const merchant = body

        const pkg = {
            _id: uuidv4(),
            ...merchant,
            users: [
                email,
            ],
            createdAt: moment().unix(),
        }

        /* Retrieve results. */
        results = await merchantsDb.put(pkg)
            .catch(err => {
                console.error('AUTH ERROR:', err)
            })
        console.log('RESULT (merchant)', util.inspect(results, false, null, true))


        return res.json(results)
    } else {
        return res.end('done!')
    }
}

/* Export module. */
module.exports = merchants
