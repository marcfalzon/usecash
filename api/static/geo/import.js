#!/usr/bin/env node

/* Import modules. */
const csv = require('csv-parser')
const fs = require('fs')
const moment = require('moment')
const numeral = require('numeral')
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
 * Load (Elasticsearch) Geolocation Data
 */
const loadGeoData = async function () {
    console.log('Importing geolocation data...')

    const locations = []

    const options = {
        separator: ',', // default
        skipLines: 1,
        headers: [
            'countryCode',
            'postalCode',
            'place',
            'state',
            'stateCode',
            'provinceCounty',
            'provinceCountyCode',
            'community',
            'communityCode',
            'latitude',
            'longitude',
            'accuracy',
            'country',
            'continent',
        ]
    }

    fs.createReadStream('./europe.csv')
        .pipe(csv(options))
        .on('data', _data => {
            /* Set country code. */
            // TODO: Validate 2-character country code
            const countryCode = _data.countryCode.trim()

            /* Set postal code. */
            const postalCode = _data.postalCode
                .trim()
                .toUpperCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                // .replace(/ /g, '_')
                .replace(/[^0-9a-zA-Z]/g, '_')

            /* Set place. */
            const place = _data.place
                .trim()
                .toUpperCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                // .replace(/ /g, '_')
                .replace(/[^0-9a-zA-Z]/g, '_')

            /* Set location id. */
            const id = `${countryCode}:${postalCode}:${place}`

            /* Set location (details). */
            const location = {
                id,
                ..._data,
            }

            /* Parse latitude. */
            location.latitude = Number(location.latitude)

            /* Parse longitude. */
            location.longitude = Number(location.longitude)

            /* Parse accuracy. */
            location.accuracy = Number(location.accuracy)

            /* Add location. */
            locations.push(location)
        })
        .on('end', async () => {
            console.log('\nNum locations:', numeral(locations.length).format('0,0'))

            /* Handle locations. */
            for (let i = 0; i < locations.length; i++) {
                /* Set location. */
                const location = locations[i]

                /* Set endpoint. */
                const endpoint = `http://127.0.0.1:9200/geo/_doc/${location.id}`
                // console.log('ENDPOINT', endpoint)

                /* Request Elasticsearch query. */
                response = await superagent
                    .put(endpoint)
                    .send(location)
                    .set('accept', 'json')
                    .catch(err => console.error(err))
                console.log('\nRESPONSE', response.body)

                sleep(100)
            }
        })

}

/* Load Geolocation Data. */
loadGeoData()
