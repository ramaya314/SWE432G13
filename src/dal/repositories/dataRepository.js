
function DataRepository(initialData) {
    this.initialData = initialData;
    return this;
}

DataRepository.prototype = {
    loadData: function () {
        let sessionData = sessionStorage.getItem(this.moduleName);
        this.data = JSON.parse(sessionData) || this.initialData;
    },
    writeData: function() {
        sessionStorage.setItem(this.moduleName, JSON.stringify(this.data));
    },
    get: function (id) {
        return this.data[id];
    },
    getAll: function () {
        return Object.entries(this.data).map(entry => entry[1]);
    },
    addUpdate: function (object) {
        console.log('saving object');
        if(!object) {
            console.error('no object was provided for addUpdate');
            return;
        }

        if(!object.id) {
            object.id = Date.now(); //pseudo-hash, unique enough
        }
        this.data[object.id] = object;
        this.writeData();
    },
    delete: function(id) {
        if(!id) return;
        delete this.data[id];
        this.writeData();
    }
}
