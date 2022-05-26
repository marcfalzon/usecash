/* Import modules. */
const { Magic } = require('@magic-sdk/admin')
const moment = require('moment')
const PouchDB = require('pouchdb')
const superagent = require('superagent')
const util = require('util')
const { v4: uuidv4 } = require('uuid')

const magicAdmin = new Magic(process.env.MAGIC_LINK_KEY)

/* Initialize databases. */
const usersDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/users`)
const logsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/logs`)

/**
 * Users Module
 */
const users = async function (req, res) {
    const body = req.body
    console.log('BODY', body)

    /* Validate body. */
    if (body) {
        const id = uuidv4()
        const createdAt = moment().unix()

        const pkg = {
            _id: id,
            src: 'admin-users',
            ...body,
            createdAt,
        }

        results = await logsDb.put(pkg)
            .catch(err => console.error('LOGS ERROR:', err))
    }

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

        /* Request existing user. */
        results = await usersDb.query('api/byAddress', {
            include_docs: true,
        }).catch(err => {
            console.error('DATA ERROR:', err)
        })
        console.log('USERS RESULT (byAddress)', util.inspect(results, false, null, true))

        if (results && results.rows.length > 0) {
            const users = results.rows.map(_user => {
                const doc = _user.doc

                return {
                    address: doc.address,
                    email: doc.email,
                    createdAt: doc.createdAt,
                }
            })

            return res.json(users)
        }

        return res.json({
            error: 'Bad request',
        })
    }

    return res.json({
        error: 'Bad request',
    })
}

/* Export module. */
module.exports = users
