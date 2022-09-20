/* Import modules. */
const { Magic } = require('@magic-sdk/admin')
const moment = require('moment')
const PouchDB = require('pouchdb')
const superagent = require('superagent')
const util = require('util')
const { v4: uuidv4 } = require('uuid')

const magicAdmin = new Magic(process.env.MAGIC_LINK_KEY)

/* Initialize databases. */
const merchantsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/merchants`)
const logsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/logs`)

/**
 * Users Module
 */
const merchants = async function (req, res) {
    let authorization
    let body
    let createdAt
    let doc
    let email
    let headers
    let id
    let merchants
    let pkg
    let token

    body = req.body
    // console.log('BODY', body)

    /* Validate body. */
    if (body) {
        id = uuidv4()
        createdAt = moment().unix()

        pkg = {
            _id: id,
            src: 'admin-merchants',
            ...body,
            createdAt,
        }

        results = await logsDb.put(pkg)
            .catch(err => console.error('LOGS ERROR:', err))
    }

    /* Set headers. */
    headers = req.headers

    /* Validate headers. */
    if (headers) {
        /* Set authorization. */
        authorization = headers.authorization

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
        token = authorization.split(' ')[1]
        // console.log('RECEIVED TOKEN', token)

        /* Validate token. */
        if (!token) {
            /* Set status. */
            res.status(400)

            /* Return error. */
            return res.json({
                error: 'You MUST provide an authorization token.'
            })
        }

        /* Validate email. */
        // if (!email) {
        //     /* Set status. */
        //     res.status(401)
        //
        //     /* Return error. */
        //     return res.json({
        //         error: 'Unauthorized user.'
        //     })
        // }
    }

    /* Validate revision id (DB UPDATE). */
    if (body.rev) {
        /* Create (updated) merchant package. */
        merchant = {
            _id: body.id,
            _rev: body.rev,
            ...body,
            updatedAt: moment().unix(),
        }

        /* Delete (duplicate) revision. */
        delete merchant.rev

        /* Request existing user. */
        results = await merchantsDb
            .put(merchant)
            .catch(err => {
            console.error('DATA ERROR:', err)
        })
        console.log('MERCHANTS RESULT (byAddress)', util.inspect(results, false, null, true))

        return res.json(results)
    } else {
        /* Request existing user. */
        results = await merchantsDb.query('api/byName', {
            include_docs: true,
        }).catch(err => {
            console.error('DATA ERROR:', err)
        })
        console.log('MERCHANTS RESULT (byAddress)', util.inspect(results, false, null, true))

        if (results && results.rows.length > 0) {
            merchants = results.rows.map(_merchant => {
                doc = _merchant.doc

                return {
                    id: doc._id,
                    rev: doc._rev,
                    category: doc.category,
                    crypto: doc.crypto,
                    name: doc.name,
                    streetAddress: doc.streetAddress,
                    city: doc.city,
                    state: doc.state,
                    postalCode: doc.postalCode,
                    country: doc.country,
                    website: doc.website,
                    media: doc.media,
                    lat: doc.lat,
                    lng: doc.lng,
                    users: doc.users,
                    createdAt: doc.createdAt,
                    updatedAt: doc.updatedAt,
                }
            })

            return res.json(merchants)
        }
    }

    return res.json({
        error: 'Bad request',
    })
}

/* Export module. */
module.exports = merchants
