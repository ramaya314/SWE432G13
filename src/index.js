//lib imports
var express = require('express');
const path = require('node:path'); 
//local imports
const router = require("./routes/index");

var app = express();

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//parse json bodies
app.use(express.json()) 

// static resources
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', router);

app.listen(8080);
console.log('Server is listening on port 8080');