const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const SongRepository = require('../database/repositories/songRepository');

const songRepository = new SongRepository();

router.route('/')
    .get(asyncHandler(async (req, res) => {
        res.json(await songRepository.getAll());
    }))
    
router.route('/:id')
    .get(asyncHandler(async (req, res) => {
        var id = req.params.id;
        var result = await songRepository.get(id);
        console.log('get song result', result);
        res.json(result);
    }))
  
module.exports = router;
