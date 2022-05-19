/* Import modules. */
const fs = require('fs')

/**
 * Media Module
 */
const media = async function (req, res) {
    const mediaid = req.params.mediaid
    // console.log('MEDIA ID', mediaid)

    let id

    if (mediaid.indexOf('.') !== -1) {
        id = mediaid.slice(0, mediaid.indexOf('.'))
    } else {
        id = mediaid
    }

    const path = `/media/tmp/${id}`

    fs.readFile(path, function (err, content) {
        if (err) {
            res.writeHead(400, {'Content-type':'text/html'})
            res.end('No such image')
        } else {
            //specify the content type in the response will be an image
            res.writeHead(200, { 'Content-type':'image/jpg' })
            res.end(content)
        }
    })

}

/* Export module. */
module.exports = media
