
const express = require("express");
const router = express.Router();
const apiRouter = require("./api");
const asyncHandler = require("express-async-handler");
const session = require('express-session');

const ShowRepository = require('../dal/repositories/showRepository');

router.use('/api', apiRouter);

router.get('/producer', function(req, res) {
    console.log('session date', req.session.filterShowDate);
    res.render('pages/producer/producer', {filterDate: req.session.filterShowDate});
});
router.get('/show/edit', function(req, res) {
    res.render('pages/show/edit', {show: null, sessionDate: req.session.filterShowDate});
});
router.route('/show/edit/:id')
    .get(asyncHandler(async (req, res) => {
        let show = await (new ShowRepository()).get(req.params.id);
        console.log('got show', show);
        res.render('pages/show/edit', { show });
    }));

    
router.get('/logout', function(req, res) {
    req.session.destroy();
    res.sendStatus(200);
});

module.exports = router;