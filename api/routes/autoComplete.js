/* Import modules. */
const moment = require('moment')
const PouchDB = require('pouchdb')
const superagent = require('superagent')
const util = require('util')

/* Initialize databases. */
// const logsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/logs`)
// const sessionsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/sessions`)
const coinmapDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/coinmap`)

/**
 * Auto Complete
 */
const autoComplete = async function (req, res) {
    /* Set query. */
    const query = req.params.query.toLowerCase()
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

    let index
    let type
    let results
    let body
    let dslQuery
    let hits

    /* Request existing user. */
    results = await coinmapDb.query('api/byKeyword', {
        // include_docs: true,
    }).catch(err => {
        console.error('DATA ERROR:', err)
    })
    // console.log('USERS RESULT (byKeyword)', util.inspect(results, false, null, true))

    let venues
    let count = 0

    if (results.rows.length > 0) {
        venues = results.rows.filter(_venue => {
            const key = _venue.key.toLowerCase()

            if (key.indexOf(query) !== -1) {
                // console.log('KEY', key)
                count++
                return true
            } else {
                return false
            }
        })

    }

    /* Return package. */
    res.json({
        count,
        venues,
    })
}

/* Export module. */
module.exports = autoComplete
