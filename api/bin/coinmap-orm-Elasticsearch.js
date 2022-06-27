#!/usr/bin/env node

/* Import modules. */
const moment = require('moment')
const superagent = require('superagent')
const { v4: uuidv4 } = require('uuid')

/* Initialize holders. */
let cache
let hits
let response
let vendor
let vendorid

/**
 * Sleep
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Update Venue
 */
const updateVenue = async function (_isLive) {
    console.log('Updating venue...')

    // const id = 9347
    const id = 60

    if (!_isLive) {
        /* Request coinmap venue. */
        response = await superagent
        .get(`https://coinmap.org/api/v1/venues/${id}`)
            .set('accept', 'json')
            .catch(err => console.error(err))
            // console.log('\nRESPONSE', response)

            cache = response.body.venue
            console.log('\nCACHE (coinmap source):', cache)
    }

    /* Set endpoint. */
    let endpoint = `http://127.0.0.1:9200/coinmap.2/_doc/${id}`
    // let endpoint = `http://127.0.0.1:9200/coinmap.2/_search`
    console.log('ENDPOINT', endpoint)

    // const dslQuery = {
    //     query: {
    //         match: { id }
    //     }
    // }
    // console.log('\nDSL QUERY', dslQuery)

    /* Request Elasticsearch query. */
    response = await superagent
        .get(endpoint)
        // .send(dslQuery)
        .set('accept', 'json')
    console.log('\nRESPONSE', response.body)

    if (response.body && response.body.hits && response.body.hits.hits) {
        hits = response.body.hits.hits
        console.log('\nHITS', hits)

        if (hits && hits[0]._source) {
            /* Set vendor id. */
            vendorid = hits[0]._id
            console.log('\nVENDOR ID (hits):', vendorid)

            /* Set vendor source. */
            vendor = hits[0]._source
            console.log('\nVENDOR (hits):', vendor)
        }
    }

    if (response.body && response.body._source) {
        /* Set vendor id. */
        vendorid = response.body._id
        console.log('\nVENDOR ID (source):', vendorid)

        /* Set vendor source. */
        vendor = response.body._source
        console.log('\nVENDOR (source):', vendor)
    }

    if (_isLive) {
        /* Set endpoint. */
        endpoint = `http://127.0.0.1:9200/coinmap/_doc/${vendorid}`
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
    response = await superagent
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
        const responseDetail = await superagent
            .get(`https://coinmap.org/api/v1/venues/${vendor.id}`)
            .set('accept', 'json')
            .catch(err => console.error(err))
        // console.log('\nRESPONSE', responseDetail)

        const details = responseDetail.body.venue
        // console.log('\nCACHE', cache)

        /* Set endpoint. */
        const endpoint = `http://127.0.0.1:9200/coinmap.2/_doc/${vendor.id}`
        // console.log('ENDPOINT', endpoint)

        vendor = {
            ...vendor,
            ...details,
        }
        // console.log('\nVENDOR-2', vendor)
        // return

        /* Generate new UUID. */
        vendor.id = uuidv4()

        /* Add lng for OSM support. */
        vendor.lng = vendor.lon

        /* Request Elasticsearch query. */
        response = await superagent
            .put(endpoint)
            .send(vendor)
            .set('accept', 'json')
            .catch(err => console.error(err))
        console.log('\nRESPONSE', response.body, (cache.length - (i + 1)), 'remaining')

        await sleep(100)
    }

}

/* Load Coinmap. */
// loadCoinmap()

/* Update Coinmap. */
updateVenue(false)
