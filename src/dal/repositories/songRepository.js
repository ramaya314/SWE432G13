class SongRepository extends DataRepository{
    constructor(initialData) {
        super(initialData);
        this.moduleName = "songs"
        this.loadData();
    }
}
