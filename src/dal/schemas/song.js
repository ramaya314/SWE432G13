const mongoose = require('mongoose'); 
const { Schema } = mongoose; 
const songSchema = new mongoose.Schema({ 
    id: { 
        type: Number, 
        unique: true, 
        required: true 
    }, 
    artist: { 
        type: String, 
        required: true 
    }, 
    song_name: { 
        type: String, 
        required: true 
    }, 
    year: { 
        type: Number
    }, 
    total: { 
        type: Number
    }, 
    usa: { 
        type: Number
    }, 
    uk: { 
        type: Number
    } , 
    eur: { 
        type: Number
    } , 
    row: { 
        type: Number
    } 
});
        
module.exports = songSchema;