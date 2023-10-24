
const fs = require('fs');
const path = require('node:path'); 

function DataRepository(initialData) {
    this.initialData = initialData;
    return this;
}

DataRepository.prototype = {
    dataFilePath: function() {
        return path.join(__dirname, '..', '..', 'dal', 'data', `${this.moduleName}.json`);
    },
    loadData: function () {
        if (fs.existsSync(this.dataFilePath())) {
            this.data = JSON.parse(fs.readFileSync(this.dataFilePath()));
        } else if(this.initialData) {
            this.data = this.initialData;
        } else {
            this.data = {};
        }
    },
    writeData: function() {
        fs.writeFileSync(this.dataFilePath(), JSON.stringify(this.data));
    },
    get: function (id) {
        return this.data[id];
    },
    getAll: function () {
        return this.data ? Object.entries(this.data).map(entry => entry[1]) : [];
    },
    addUpdate: function (object) {
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

module.exports = DataRepository;