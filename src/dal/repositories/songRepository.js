const DataRepository = require('./dataRepository');

class SongRepository extends DataRepository{
    constructor(initialData) {
        super(initialData);
        this.moduleName = "songs"
        this.loadData();
    }
}

module.exports = SongRepository;