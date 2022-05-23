/* Import modules. */
const moment = require('moment')
const PouchDB = require('pouchdb')
const superagent = require('superagent')
const util = require('util')

/* Initialize databases. */
const coinmapDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/coinmap`)
const merchantsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/merchants`)

/* Initialize cache. */
let cache = {}

/**
 * Map Bounds
 */
const mapBounds = async function (req, res) {
    let endpoint
    let results

    let merchants = []
    let venues = []

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

    /* Request coinmap venues. */
    results = await coinmapDb.query('api/byLat', {
        startkey: parseFloat(sw.lat),
        endkey: parseFloat(ne.lat),
        include_docs: true,
    })
    .catch(err => {
        console.error('SESSION ERROR:', err)
    })
    // console.log('RESULT (byGeo)', util.inspect(results, false, null, true))

    if (!results) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json([])
    }

    console.log(`\nFound [ ${results.rows.length} ] venues matching that LAT`)

    /* Filter venues. */
    venues = results.rows.filter(_venue => {
        /* Set venue. */
        const venue = _venue.doc

        /* Parse longitude. */
        if (venue.lon >= parseFloat(sw.lng) && venue.lon <= parseFloat(ne.lng)) {
            return venue
        }
    })

    /* Update venues. */
    // NOTE: Added to improve data compatibility.
    venues = venues.map(_venue => {
        /* Add (alt) longitude. */
        _venue.lng = _venue.lon

        /* Return venue. */
        return _venue
    })
    console.log('FOUND', venues.length, 'venues')

    // console.log('MERCHANTS', merchants.length)
    // console.log('COINMAP', coinmap.length)

    /* Request merchant venues. */
    results = await merchantsDb.query('api/byGeo', {
        startkey: [ parseFloat(sw.lat) ],
        endkey: [ parseFloat(ne.lat) ],
        include_docs: true,
    })
    .catch(err => {
        console.error('SESSION ERROR:', err)
    })

    if (results) {
        /* Set merchants. */
        merchants = results.rows.map(_merchant => {
            /* Set merchant. */
            const merchant = _merchant.doc

            /* Return merchant. */
            return merchant
        })
        console.log('FOUND', merchants.length, 'merchants')
    }

    /* Return JSON. */
    return res.json([
        ...merchants,
        ...venues,
    ])

}

/* Export module. */
module.exports = mapBounds
