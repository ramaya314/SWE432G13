const mongoose = require('mongoose')
const djSchema = require('../schemas/dj')
module.exports = mongoose.model('DJ', djSchema)