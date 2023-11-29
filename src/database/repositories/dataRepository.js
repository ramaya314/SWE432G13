
function DataRepository(initialData, model) {
    this.initialData = initialData;
    this.model = model;
    return this;
}

DataRepository.prototype = {
    get: async function (id) {
        let matches = await this.model.find({_id: id});
        if(matches.length > 0)
            return matches[0];
        else return null;
    },
    getAll: async function () {
        return await this.model.find();
    },
    addUpdate: async function (object) {
        if(!object) {
            console.error('no object was provided for addUpdate');
            return;
        }
        if(!object._id) {
            const updateObject = new this.model(object);
            await updateObject.save();
        } else {
            var query = {'_id': object._id};
            await this.model.findOneAndUpdate(query, object, {upsert: true});
        }

    },
    delete: async function(id) {
        if(!id) return false;
        await this.model.deleteOne({_id: id});
        return true;
    }
}

module.exports = DataRepository;