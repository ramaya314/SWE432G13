require('dotenv').config()

const express = require('express');
const path = require('node:path')
const bodyParser = require('body-parser')
const session = require('express-session')


const pageRoutes = require('./routes/pages')
const userRoutes = require('./routes/users')
const apiRoutes = require('./routes/api')

const dbConnection = require('./database/connection')

const app = express()

app.use(bodyParser.json())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))

// Set the view engine to EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.set(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/pages/', pageRoutes)
// Establish the user route
app.use('/users/', userRoutes)
app.use('/api/', apiRoutes)
app.get('/', (req, res) => {
    res.redirect('/pages/login')
})

async function main() {
    await dbConnection(process.env.MONGO_CONNECTION_STRING)
    app.listen(process.env.PORT);
    console.log('Server is listening on port ' + process.env.PORT);
}

main().catch(err => console.log(err));