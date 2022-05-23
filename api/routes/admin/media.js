/* Import modules. */
const moment = require('moment')
const superagent = require('superagent')

/**
 * Meida Module
 */
const media = async function (req, res) {
    const files = req.files
    console.log('FILES', files)

    let file

    if (files['storefront']) {
        file = files['storefront']
    } else if (files['logos']) {
        file = files['logos']
    } else if (files['sticker']) {
        file = files['sticker']
    }
    // console.log('FILE', file)

    const path = `/media/tmp/${file.name}`

    file.mv(path, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).send(err)
        }

        return res.json({
            status: 'success',
            path: path,
        })
    })

    // res.end('done!')
}

/* Export module. */
module.exports = media
