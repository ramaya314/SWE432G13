const express = require('express')
const router = express.Router()
const dbc = require('../database/repositories/userRepository')

// Require controller modules.
const showController = require("../controllers/showController");
const songController = require("../controllers/songController");

router.use('/shows', showController);
router.use('/songs', songController);

router.get('/djs', (req, res) => {
    dbc.retrieveAllDjs().then(resp => {
        res.send(JSON.stringify(resp))
    })
})

module.exports = router