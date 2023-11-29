const mongoose = require('mongoose'); 
const showSchema = require('../schemas/show');
module.exports = mongoose.model('Show', showSchema);