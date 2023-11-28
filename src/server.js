const express = require('express');
const path = require('node:path')
const bodyParser = require('body-parser')
const session = require('express-session')

require('dotenv').config()

const pageRoutes = require('./routes/pages')
const userRoutes = require('./routes/users')
const apiRoutes = require('./routes/api')

const dbConnection = require('./database/connection')
const usc = require('./database/repositories/userRepository')

const port = process.env.PORT

const app = express()

app.use(bodyParser.json())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

dbConnection.connect(`${process.env.MONGO_CONNECTION_STRING}`)

// Set the view engine to EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.set(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/pages/', pageRoutes)

// Establish the user route
app.use('/users/', userRoutes)

app.use('/api/', apiRoutes)

app.listen(port, () => {
    console.log(`Server has started on port ${port}`)
})

app.get('/', (req, res) => {
    res.redirect('/pages/login')
})