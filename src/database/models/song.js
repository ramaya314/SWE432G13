const mongoose = require('mongoose'); 
const songSchema = require('../schemas/song');
module.exports = mongoose.model('Song', songSchema);