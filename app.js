var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // true
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var db = require('./db');
global.__root   = __dirname + '/'; 

app.get('/', function (req, res) {
  res.status(200).send('API works.');
});

var UserController = require(__root + 'user/UserController');
app.use('/users', UserController);

var AuthController = require(__root + 'auth/AuthController');
app.use('/auth', AuthController);

module.exports = app;