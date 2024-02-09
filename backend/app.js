var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require("dotenv").config();
const OpenAi = require("openai");

const openai = new OpenAi({
    apiKey: process.env.AI_API_KEY,
})

// console.log("openai", openai);


MongoClient.connect('mongodb://localhost:27017')
.then(client => {
    console.log('database:', ' we are connected');

    const db = client.db('tweet-clone');
    
    app.locals.db = db;
})
.catch(err => {
    console.log('database:', 'connection failed', err);
});




// 192.168.170.134 // ip-adress

var tweetsRouter = require('./routes/tweets');
var usersRouter = require('./routes/users');

var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/tweets', tweetsRouter);
app.use('/users', usersRouter);



module.exports = app;
