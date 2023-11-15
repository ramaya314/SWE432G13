const DataRepository = require('./dataRepository');
var songModel = require('../models/song');

class SongRepository extends DataRepository{
    constructor(initialData) {
        super(initialData, songModel);
    }
}

module.exports = SongRepository;