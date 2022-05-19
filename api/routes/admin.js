/* Import modules. */
const moment = require('moment')
const superagent = require('superagent')

/**
 * Administration Module
 */
const admin = async function (req, res) {
    let source

    if (req.params) {
        source = req.params.source
    }

    if (source) {
        /* Handle source. */
        switch(source) {
        case 'contractors':
            return require('./admin/contractors')(req, res)
        case 'merchants':
            return require('./admin/merchants')(req, res)
        case 'people':
            return require('./admin/people')(req, res)
        }

        return res.json({
            error: `no handler found for [ ${source} ]`,
        })
    }

    if (req.method === 'POST') {
        console.log('BODY', req.body)

        return res.json({ hi: 'there!' })
    } else {
        return res.end('done!')

    }

}

/* Export module. */
module.exports = admin
