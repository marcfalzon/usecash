/* Import modules. */
const superagent = require('superagent')

/* Initialize cache. */
let cache = {}

/**
 * Coinmap
 */
const coinmap = async function (req, res) {
    // console.log('CONTRACTORS REQ PARAMS', req.params)

    if (req.params && req.params.id) {
        const id = req.params.id
        console.log('VENUE ID', id)

        /* Set endpoint. */
        const endpoint = `https://coinmap.org/api/v1/venues/${id}`
        // console.log('ENDPOINT', endpoint)

        /* Request Elasticsearch query. */
        const response = await superagent
            .get(endpoint)
            .set('accept', 'json')
            .catch(err => console.error(err))
        // console.log('RESPONSE', response.body)

        /* Set body. */
        const body = response.body

        /* Validate body. */
        if (!body) {
            /* Set status. */
            res.status(400)

            /* Return error. */
            return res.json({
                error: 'Bad response from Coinmap API.'
            })
        }

        /* Set venue. */
        const venue = body.venue

        /* Validate venue. */
        if (!venue) {
            /* Set status. */
            res.status(400)

            /* Return error. */
            return res.json({
                error: 'Bad response from Coinmap API.'
            })
        }
        // console.log('VENUE', venue)

        /* Return cached data. */
        res.json(venue)
    }
}

/* Export module. */
module.exports = coinmap
