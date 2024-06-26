var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session')

var indexRouter = require('./routes/index');

var app = express();

app.use(session({
    secret: 'rock and roll',
    resave: true,
    saveUninitialized: true,
    httpOnly: false,
    cookie: { maxAge: 1000 * 60 * 60 },
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
