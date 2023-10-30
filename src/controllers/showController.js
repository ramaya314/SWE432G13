const express = require("express");
const router = express.Router();

const ShowRepository = require('../dal/repositories/showRepository');
const showRepository = new ShowRepository();

router.route('/')
    .get(function(req, res) {
        var date = req.query.date;
        console.log('date', date);
        if(!date) {
            res.json(showRepository.getAll());
            return;
        }
        res.json(showRepository.getShowsByDate(date));
    })
    .post(function(req, res) {
        showRepository.addUpdate(req.body);
        res.sendStatus(200);
    })

router.route('/:id')
    .get(function(req, res) {
        var id = req.params.id;
        res.json(showRepository.get(id));
    })
    .delete(function(req, res) {
        var id = req.params.id;
        showRepository.delete(id);
        res.sendStatus(200);
    })
    
router.route('/:id/songs')
    .get(function(req, res) {
        var id = req.params.id;
        var show = showRepository.get(id);
        if(!show) {
            res.sendStatus(404);
            return;
        }
        res.json(Object.entries(show.songs).map(entry => entry[1]));
    })
    
router.route('/:showId/songs/:songId')
    .delete(function(req, res) {
        var showId = req.params.showId;
        var songId = req.params.songId;
        showRepository.removeSong(songId, showId);
        res.sendStatus(200);
    })
  
module.exports = router;

//future ref
// const asyncHandler = require("express-async-handler");
// exports.show_list = asyncHandler(async (req, res, next) => {
//     res.send("NOT IMPLEMENTED: Author list");
// });