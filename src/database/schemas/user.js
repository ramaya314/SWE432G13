// User controller for database functions
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    
    password: {
        type: String,
        required: true
    },
    
    following: {
        type: [String],
        default: 
        [
            "Aria",
            "Groove Master",
            "Jazz Cat",
            "Rock Star",
            "Rhythmic Beats",
            "Serenity",
            "Latin Heat",
            "Country Girl" 
        ]
    },

    preferences: {
        type: [String],
        default: ["country"]
    }
})

module.exports = userSchema