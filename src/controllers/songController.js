const express = require("express");
const router = express.Router();
const SongRepository = require('../dal/repositories/songRepository');

const songRepository = new SongRepository();

router.route('/')
    .get(function(req, res) {
        res.json(songRepository.getAll());
    })
    
router.route('/:id')
    .get(function(req, res) {
        var id = req.params.id;
        res.json(songRepository.get(id));
    })
  
module.exports = router;
