#!/usr/bin/env node

/* Import modules. */
const moment = require('moment')
const PouchDB = require('pouchdb')
const superagent = require('superagent')
const { v4: uuidv4 } = require('uuid')

/* Initialize cache. */
let cache

/* Initialize databases. */
const coinmapDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/coinmap`)

/**
 * Sleep
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Load (Elasticsearch) Coinmap
 */
const loadCoinmap = async function () {
    console.log('Updating coinmap...')

    let response
    let response2
    let results
    let details

    /* Request coinmap venues. */
    response = await superagent
        .get('https://coinmap.org/api/v1/venues/')
        .set('accept', 'json')
        .catch(err => console.error(err))

    cache = response.body.venues
    // console.log('CACHE', cache)

    let count = 0
    /* Handle merchants. */
    for (let i = 12200; i < cache.length; i++) {
        /* Initialize vendor. */
        let vendor = cache[i]
        // console.log('\nVENDOR-1', vendor)

        /* Request coinmap venue. */
        response2 = await superagent
            .get(`https://coinmap.org/api/v1/venues/${vendor.id}`)
            .set('accept', 'json')
            .catch(err => console.error(err))
        // console.log('\nRESPONSE', response2)

        const venue = response2.body.venue
        // console.log('\nVENUE', venue)

        const pkg = {
            _id: venue.id.toString(),
            ...venue,
        }

        /* Add NEW venue to database. */
        results = await coinmapDb.put(pkg)
            .catch(err => console.error('MERCHANTS ERROR:', err))
        console.log('RESULTS', (cache.length - i), results)

        // await sleep(250)
        await sleep(50)
    }

}

/* Load Coinmap. */
loadCoinmap()
