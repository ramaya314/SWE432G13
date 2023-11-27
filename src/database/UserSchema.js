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
            "654c529632a91e44e1d25c15",
            "654c529632a91e44e1d25c16", 
            "654c529632a91e44e1d25c17",
            "654c529632a91e44e1d25c17",
            "654c529632a91e44e1d25c18",
            "654c529632a91e44e1d25c19",
            "654c529632a91e44e1d25c20",
            "654c529632a91e44e1d25c21",
            "654c529632a91e44e1d25c22",
            "654c529632a91e44e1d25c23",
            "654c529632a91e44e1d25c24",
            "654c529632a91e44e1d25c25",
            "654c529632a91e44e1d25c26",
            "654c529632a91e44e1d25c27",
        ]
    },

    preferences: {
        type: [String],
        default: ["country"]
    }
})

module.exports = mongoose.model("user", userSchema)
