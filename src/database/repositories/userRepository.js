const mongoose = require('mongoose')

const User = require('../models/user')
const Dj = require('../models/dj')

// Create a username with the given credentials.
createUser = async(user, pass) => {
    try {
        const newUser = new User({username: user, password: pass})
        await newUser.save()
        return newUser
    } catch (err) {
        throw err
    }
}

verifyConnected = () => {
    console.log(mongoose.connection.readyState)
}

verifyUserExist = async(user) => {
    const doc = await User.findOne({ username: user })

    if (doc === null) {
        return false
    }

    return true
}

retrieveUser = async(user, pass) => {
    
    const doc = await User.findOne({ username: user, password: pass })

    if (doc === null) {
        return null
    }

    return doc
}

retrieveUserNoPass = async(user) => {
    const doc = await User.findOne({ username: user })

    if (doc === null) {
        return null
    }

    return doc
}

retrieveAllDjs = async() => {
    const doc = await Dj.find()
    return doc
}

retrieveDjsByName = async(name) => {
    const doc = await Dj.find({ name: name })

    if (doc == null) {
        return JSON.stringify({})        
    }

    return doc
}

updateFollowers = async(user, arr) => {
    const doc = await User.findOneAndUpdate({ username: user }, { following: arr })

    if (doc === null) {
        return null
    }

    return doc
}

updatePreferences = async(user, arr) => {
    const doc = await User.findOneAndUpdate({ username: user }, { preferences: arr })

    if (doc === null) {
        return null
    }

    return doc
}

module.exports = { 
    createUser, 
    verifyUserExist, 
    verifyConnected, 
    retrieveUser,
    retrieveUserNoPass, 
    retrieveDjsByName,
    retrieveAllDjs,
    updateFollowers,
    updatePreferences
}
