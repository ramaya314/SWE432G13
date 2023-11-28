const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const ShowRepository = require('../database/repositories/showRepository');
const showRepository = new ShowRepository();

router.route('/')
    .get(asyncHandler(async (req, res) => {
        var date = req.query.date;
        req.session.filterShowDate = date;
        if(!date) {
            res.json(await showRepository.getAll());
            return;
        }
        res.json(await showRepository.getShowsByDate(date));
    }))
    .post(asyncHandler(async (req, res) => {
        await showRepository.addUpdate(req.body);
        res.sendStatus(200);
    }))

router.route('/:id')
    .get(asyncHandler(async (req, res) => {
        var id = req.params.id;
        let show = await showRepository.get(id);
        return show ? res.json(show) : res.sendStatus(404);
    }))
    .delete(asyncHandler(async (req, res) => {
        var id = req.params.id;
        await showRepository.delete(id);
        res.sendStatus(200);
    }))
    
router.route('/:id/songs')
    .get(asyncHandler(async (req, res) => {
        var id = req.params.id;
        var show = await showRepository.get(id);
        if(!show) {
            res.sendStatus(404);
            return;
        }
        res.json(show.songs);
    }))
    
router.route('/:showId/songs/:songId')
    .delete(asyncHandler(async (req, res) => {
        var showId = req.params.showId;
        var songId = req.params.songId;
        await showRepository.removeSong(songId, showId);
        res.sendStatus(200);
    }))
    .put(asyncHandler(async (req, res) => {
        var showId = req.params.showId;
        var songId = req.params.songId;
        await showRepository.addSong(songId, showId);
        res.sendStatus(200);
    }))
  
module.exports = router;