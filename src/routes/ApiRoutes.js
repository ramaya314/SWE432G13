const express = require('express')
const router = express.Router()
const dbc = require('../database/dbc')

router.get('/djs', (req, res) => {
    dbc.retrieveAllDjs().then(resp => {
        res.send(JSON.stringify(resp))
    })
})

router.get('/djs/name', (req, res) => {
    console.log(req.body.names)
})

module.exports = router