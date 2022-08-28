/* Import modules. */
const { Magic } = require('@magic-sdk/admin')
const moment = require('moment')
const PouchDB = require('pouchdb')
const superagent = require('superagent')
const util = require('util')
const { v4: uuidv4 } = require('uuid')

const magicAdmin = new Magic(process.env.MAGIC_LINK_KEY)

/* Initialize databases. */
const coinmapDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/coinmap`)
const merchantsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/merchants`)
const logsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/logs`)

/**
 * Merchants Module
 */
const merchants = async function (req, res) {
    const merchantid = req.params.id
    console.log('MERCHANT ID', merchantid)

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

        results = await logsDb
            .put(pkg)
            .catch(err => console.error('LOGS ERROR:', err))
    }

    if (req.method === 'GET') {
        /* Validate merchant id. */
        if (merchantid) {
            /* Request merchant venues. */
            results = await merchantsDb.get(merchantid, {
                include_docs: true,
            }).catch(err => {
                console.error('DATA ERROR:', err)
            })
            // console.log('MERCHANTS RESULT (byId)', util.inspect(results, false, null, true))

            if (!results) {
                /* Request coinmap venues. */
                results = await coinmapDb.get(merchantid, {
                    include_docs: true,
                }).catch(err => {
                    console.error('DATA ERROR:', err)
                })
                // console.log('COINMAP RESULT (byId)', util.inspect(results, false, null, true))
            }

            if (!results) {
                /* Set status. */
                res.status(400)

                /* Return error. */
                return res.json([])
            }

            /* Build data package. */
            const pkg = {
                category: results.category,
                crypto: results.crypto || results.coins,
                name: results.name,
                streetAddress: results.streetAddress || results.street,
                city: results.city,
                state: results.state,
                postalCode: results.postalCode || results.postcode,
                country: results.country,
                website: results.website,
                phone: results.phone,
                media: results.media,
                lat: results.lat,
                lng: results.lng || results.lon,
                facebook: results.facebook,
                twitter: results.twitter,
                instagram: results.instagram,
                createdAt: results.createdAt,
                updateAt: results.updateAt || results.updated_on,
            }

            return res.json(pkg)
        }

        return res.json([])
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
            console.log('RECEIVED TOKEN', token, typeof token)

            /* Validate token. */
            if (!token || typeof token === 'undefined' || token === 'undefined') {
                /* Set status. */
                res.status(400)

                /* Return error. */
                return res.json({
                    error: 'You MUST provide a DID token.'
                })
            }

            /* Set issuer. */
            const issuer = magicAdmin.token
                .getIssuer(token)

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
            const metadata = await magicAdmin.users
                .getMetadataByIssuer(issuer)
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

        /* Validate merchant id (for update). */
        if (merchant.id) {
            /* Request merchant venues. */
            results = await merchantsDb.get(merchant.id, {
                include_docs: true,
            }).catch(err => {
                console.error('DATA ERROR:', err)
            })
            // console.log('MERCHANTS RESULT (byId)', util.inspect(results, false, null, true))

            if (!results) {
                /* Request coinmap venues. */
                results = await coinmapDb.get(merchant.id, {
                    include_docs: true,
                }).catch(err => {
                    console.error('DATA ERROR:', err)
                })
                // console.log('COINMAP RESULT (byId)', util.inspect(results, false, null, true))
            }

            if (!results) {
                /* Set status. */
                res.status(400)

                /* Return error. */
                return res.json([])
            }

            /* Build data package. */
            const pkg = {
                ...results,
                updatedAt: moment().unix(),
            }
            return res.json(pkg)

            /* Retrieve results. */
            results = await merchantsDb
                .put(pkg)
                .catch(err => {
                    console.error('AUTH ERROR:', err)
                })
            console.log('UPDATE RESULT (merchants)', util.inspect(results, false, null, true))

            if (!results) {
                /* Retrieve results. */
                results = await coinmapDb
                    .put(pkg)
                    .catch(err => {
                        console.error('AUTH ERROR:', err)
                    })
                console.log('UPDATE RESULT (coinmap)', util.inspect(results, false, null, true))
            }

            return res.json(results)
        }

        /* Build data package. */
        const pkg = {
            _id: uuidv4(),
            ...merchant,
            users: [
                email,
            ],
            createdAt: moment().unix(),
            updatedAt: moment().unix(),
        }

        /* Retrieve results. */
        results = await merchantsDb
            .put(pkg)
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
