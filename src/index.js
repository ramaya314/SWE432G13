require('dotenv').config(); 
//lib imports
const express = require('express');
const session = require('express-session');
const path = require('node:path'); 
const mongoose = require('mongoose');
//local imports
const router = require("./routes/index");
const dbConnection = require("./dal/connection");

var app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    //cookie: { secure: true, htttpOnly: true }
}));

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//parse json bodies
app.use(express.json()) 

// static resources
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', router);


async function main() {
    await dbConnection(process.env.MONGO_CONNECTION_STRING)
    app.listen(process.env.PORT);
    console.log('Server is listening on port ' + process.env.PORT);
}

main().catch(err => console.log(err));

