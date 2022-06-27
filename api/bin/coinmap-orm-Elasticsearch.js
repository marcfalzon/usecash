#!/usr/bin/env node

/* Import modules. */
const moment = require('moment')
const superagent = require('superagent')

/* Set refresh delay. */
// FIXME: Set to the maximum supported by Airtable
const MAX_RECORDS = 10000

/* Initialize cache. */
let cache

/**
 * Sleep
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Load Venue
 */
const loadVenue = async function () {
    console.log('Updating venue...')

    const id = 8225

    /* Request coinmap venue. */
    const response = await superagent
        .get(`https://coinmap.org/api/v1/venues/${id}`)
        .set('accept', 'json')
        .catch(err => console.error(err))
    // console.log('\nRESPONSE', response)

    cache = response.body.venue
    console.log('\nCACHE', cache)

    if (cache.website) {
        const website = cache.website

        // console.log('\nUPDATING (website):', website)

        /* Set endpoint. */
        // let endpoint = `http://127.0.0.1:9200/coinmap/_doc/${vendor.id}`
        let endpoint = `http://127.0.0.1:9200/coinmap/_search`
        console.log('ENDPOINT', endpoint)

        const dslQuery = {
            query: {
                match: { id }
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

        /* Build vendor entry. */
        const vendor = {
            ...source,
            ...cache,
        }
        console.log('\nVENDOR', vendor)
return
        /* Set endpoint. */
        endpoint = `http://127.0.0.1:9200/coinmap/_doc/${vendor.id}`
        // console.log('ENDPOINT', endpoint)

        /* Request Elasticsearch query. */
        response = await superagent
            .put(endpoint)
            .send(vendor)
            .set('accept', 'json')
            .catch(err => console.error(err))
        console.log('\nVENDOR UPDATE', response.body)

    }
}

/**
 * Load (Elasticsearch) Coinmap
 */
const loadCoinmap = async function () {
    console.log('Updating coinmap...')

    /* Request coinmap venues. */
    const response = await superagent
        .get('https://coinmap.org/api/v1/venues/')
        .set('accept', 'json')
        .catch(err => console.error(err))

    cache = response.body.venues
    // console.log('CACHE', cache)

    let count = 0
    /* Handle merchants. */
    for (let i = 0; i < cache.length; i++) {
        /* Initialize vendor. */
        let vendor = cache[i]
        // console.log('\nVENDOR-1', vendor)

        /* Request coinmap venue. */
        const response2 = await superagent
            .get(`https://coinmap.org/api/v1/venues/${vendor.id}`)
            .set('accept', 'json')
            .catch(err => console.error(err))
        // console.log('\nRESPONSE', response2)

        const details = response2.body.venue
        // console.log('\nCACHE', cache)

        /* Set endpoint. */
        const endpoint = `http://127.0.0.1:9200/coinmap/_doc/${vendor.id}`
        // console.log('ENDPOINT', endpoint)

        vendor = {
            ...vendor,
            ...details,
        }
        // console.log('\nVENDOR-2', vendor)
        // return

        /* Add lng for OSM support. */
        vendor.lng = vendor.lon

        /* Request Elasticsearch query. */
        const response = await superagent
            .put(endpoint)
            .send(vendor)
            .set('accept', 'json')
            .catch(err => console.error(err))
        console.log('\nRESPONSE', response.body, (cache.length - (i + 1)), 'remaining')

        await sleep(250)
    }

}

/* Load Coinmap. */
loadCoinmap()
// loadVenue()
