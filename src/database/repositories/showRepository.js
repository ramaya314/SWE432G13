const DataRepository = require('./dataRepository');
var moment = require('moment'); 
var showModel = require('../models/show');
const SongRepository = require('./songRepository');

class ShowRepository extends DataRepository{
    constructor(initialData) {
        super(initialData, showModel);
    }

    async removeSong(songId, showId) {
        let show = await this.get(showId);
        if(!show) return;
        await show.songs.delete(songId);
        await show.save();
    }
    
    async addSong(songId, showId) {
        let show = await this.get(showId);
        if(!show) 
            return false;
        let songRepository = new SongRepository();
        let song = await songRepository.get(songId);
        if(!song)
            return false;
        show.songs.set(song._id, song);
        await show.save();
        return true;
    }

    async getShowsByDate(date) {
        let shows = await this.getAll();
        let dateObj = new Date(parseInt(date));
        let dateString = moment.utc(dateObj).format('YYYY-MM-DD');
        let filteredShows = shows.filter(show => show.date == dateString)
        return filteredShows;
    }
}


module.exports = ShowRepository;