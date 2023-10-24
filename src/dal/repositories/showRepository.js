const DataRepository = require('./dataRepository');
var moment = require('moment'); 

class ShowRepository extends DataRepository{
    constructor(initialData) {
        super(initialData);
        this.moduleName = "shows"
        this.loadData();
    }

    removeSong(songId, showId) {
        let show = this.get(showId);
        if(!show) return;
        delete show.songs[songId];
        this.addUpdate(show);
    }

    getShowsByDate(date) {
        let shows = this.getAll();
        console.log(date);
        let dateObj = new Date(parseInt(date));
        console.log(dateObj);
        let dateString = moment.utc(dateObj).format('YYYY-MM-DD');
        console.log(dateString);
        let filteredShows = shows.filter(show => show.date == dateString)
        return filteredShows;
    }
}


module.exports = ShowRepository;