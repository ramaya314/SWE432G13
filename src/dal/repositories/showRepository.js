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

        let filteredShows = shows.filter(show => new Date(show.date).getDate() == date.getDate())
        return filteredShows;
    }
}
