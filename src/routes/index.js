
const express = require("express");
const router = express.Router();
const apiRouter = require("./api");

const ShowRepository = require('../dal/repositories/showRepository');

router.use('/api', apiRouter);

// about page
router.get('/producer', function(req, res) {
    res.render('pages/producer/producer');
});

router.get('/show/edit', function(req, res) {
    res.render('pages/show/edit', {show: null});
});
router.get('/show/edit/:id', function(req, res) {
    let show = (new ShowRepository()).get(req.params.id);
    res.render('pages/show/edit', { show });
});

module.exports = router;