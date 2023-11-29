const mongoose = require('mongoose'); 
const songSchema = require('./song');
const { Schema } = mongoose; 
const showSchema = new mongoose.Schema({ 
    name: { 
        type: String, 
        unique: true, 
        required: true 
    }, 
    date: { 
        type: String, 
        required: true 
    }, 
    from: { 
        type: String, 
        required: true 
    }, 
    to: { 
        type: String, 
        required: true 
    }, 
    dj: { 
        type: String , 
        required: true
    }, 
    songs: {
        type: Map,
        of: songSchema
    }
});
        
module.exports = showSchema;