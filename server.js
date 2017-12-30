const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const Topic = require('./models/topic.js')
const app = express();
const url = 'mongodb://localhost:27017/forum_app';
// const url = 'mongodb://root:root@ds133547.mlab.com:33547/forum_app';
// const url = process.env.MONGOLAB_URI;

mongoose.connect(url, function (err, db) {
 if (err) {
   console.log('Unable to connect to the mongoDB server. Error:', err);
 } else {
   console.log('Connection established to', url);
 }
});

//set up ejs for templating
app.set('view engine', 'ejs');

// app.use(express.static('public'));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));

// app.get('/', function(req, res) {
//   res.json('you did it');
// });

app.get('/', function (req, res) {

    res.render('home', {});
});
//==========================//
//====GET ALL TOPICS===//
app.get('/new_topic', function (req, res) {

    res.render('new_topic', {});
});

app.get('/api/topics', function(req, res) {
  Topic.find({}).then(eachOne => {
    res.json(eachOne);
    })
  })
//==========================//
//====POST NEW TOPIC===//
app.post('/api/topics', function(req, res) {
  Topic.create({
    headline: req.body.HeadlineOfUser, //SignatureOfGuest
    description: req.body.DescriptionOfUser, //MessageofGuest
  }).then(topic => {
    res.json(topic)
  });
});

app.listen(process.env.PORT || 4000)
console.log('Listening...');
