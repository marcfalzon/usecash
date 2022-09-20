/* Import modules. */
const moment = require('moment')
const PouchDB = require('pouchdb')
const superagent = require('superagent')
const util = require('util')
const { v4: uuidv4 } = require('uuid')

/* Initialize databases. */
const coinmapDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/coinmap`)
const merchantsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/merchants`)
const logsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/logs`)

/**
 * Point-of-Sale Module
 */
const pos = async function (req, res) {
    const merchantid = req.params.id
    console.log('MERCHANT ID', merchantid)

    /* Validate body. */
    if (merchantid) {
        const id = uuidv4()
        const createdAt = moment().unix()

        const pkg = {
            _id: id,
            src: 'pos',
            merchantid,
            createdAt,
        }

        results = await logsDb
            .put(pkg)
            .catch(err => console.error('LOGS ERROR:', err))
    }

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
            return res.json({
                success: false,
            })
        }

        /* Build data package. */
        const pkg = {
            ...results,
            updatedAt: moment().unix(),
        }

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
    } else {
        return res.end('done!')
    }
}

/* Export module. */
module.exports = pos
