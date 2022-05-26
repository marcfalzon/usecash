'use strict'

const fileUpload = require('express-fileupload')
const express = require('express')

/* Set constants. */
const HOST = '0.0.0.0'
const PORT = 9090

/* Initialize application. */
const app = express()

/* Initialize JSON parser. */
app.use(express.json())

/* Initialize file upload. */
app.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
}))

/* Initialize URL parser. */
app.use(express.urlencoded({ extended: true }))

/* Configure application. */
app.use(function (req, res, next) {
    /* Initialize headers. */
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    /* Move to next process. */
    next()
})

/* Build welcome message. */
const welcome = `
<html>
<body>

<h2>Welcome to the Use Cash API</h2>
<h3>https://api.usecash.com</h3>

</body>
</html>
`

// TODO: Replace with a "static" site.
app.get('/', (req, res) => {
    res.end(welcome)
})

/* Initialize Administration route. */
app.post('/v1/admin/media', require('./routes/admin/media'))

/* Initialize Sessions route. */
app.get('/v1/sessions', require('./routes/sessions'))
app.post('/v1/sessions', require('./routes/sessions'))

/* Initialize Merchants route. */
app.get('/v1/merchants/:id', require('./routes/merchants'))
app.get('/v1/merchants', require('./routes/merchants'))
app.post('/v1/merchants/:id', require('./routes/merchants'))
app.post('/v1/merchants', require('./routes/merchants'))

/* Initialize Users route. */
app.get('/v1/users/:address', require('./routes/users'))
app.post('/v1/users/:address', require('./routes/users'))

/* Initialize Search route. */
app.get('/v1/search/autocomplete/:query', require('./routes/autoComplete'))
app.get('/v1/search/map/:lat/:lng/:zoom', require('./routes/search'))
app.get('/v1/search/:index/:type/:query', require('./routes/search'))
app.get('/v1/search/:index/:query', require('./routes/search'))
app.get('/v1/search/:query', require('./routes/search'))
app.post('/v1/search/map', require('./routes/mapBounds'))

/* Initialize Magic (Email) Link route. */
// app.get('/v1/magiclink', require('./routes/magiclink'))
app.post('/v1/magiclink', require('./routes/magiclink'))

/* Initialize media. */
app.get('/v1/media/:mediaid', require('./routes/media'))

// TODO: Offer help.
app.get('/v1', (req, res) => {
    res.end('Oops! I think you forgot something.')
})

/* Start listening for connections. */
app.listen(PORT, HOST)

/* Display current environment variables. */
console.info()
console.log(`Running on http://${HOST}:${PORT}`)
console.info()
console.info('Current Environment Variables')
console.info('-----------------------------')
console.info('  - NODE_ENV       :', process.env.NODE_ENV)
console.info('  - COUCHDB_AUTH   :', process.env.COUCHDB_AUTH)
console.info('  - MAGIC_LINK_KEY :', process.env.MAGIC_LINK_KEY)
console.info()
