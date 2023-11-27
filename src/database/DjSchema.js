// User controller for database functions
const mongoose = require('mongoose')

const djSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },

        category: {
            type: String,
            required: true,
            unique: false
        },

        description: {
            type: String,
            required: true,
            unique: false
        },

        imgUrl: {
            type: String,
            unique: false,
            default: "../../images/icons/dj-icon.png"
        }
})

module.exports = mongoose.model("dj", djSchema)