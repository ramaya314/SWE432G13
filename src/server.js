const express = require('express');
const path = require('node:path')
const bodyParser = require('body-parser')
const session = require('express-session')

require('dotenv').config()

const pageRoutes = require('./routes/PageRoutes')
const userRoutes = require('./routes/UserRoutes')
const apiRoutes = require('./routes/ApiRoutes')

const dbc = require('./database/dbc')

const port = process.env.PORT

const app = express()

app.use(bodyParser.json())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

dbc.connectDatabase()



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