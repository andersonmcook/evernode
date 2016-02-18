'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

const Note = mongoose.model('Notes', mongoose.Schema({
  title: String,
  text: String
}));


// set view engine to jade
app.set('view engine', 'jade');

// bodyParser middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//home route
app.get('/', (req, res) => {
  res.send('Server Running');
});

app.get('/notes/new', (req, res) => {
  res.render('new-note');
});

app.post('/notes', (req, res) => {
  Note.create(req.body, (err, note) => {
    if (err) throw err;
    console.log(note);
    res.redirect('/');
  });
});

//connect database then listen to server
mongoose.connect('mongodb://localhost:27017/evernode', (err) => {
  if (err) throw err;
  app.listen(PORT, ()=>{
    console.log(`Evernode running on port: ${PORT}`);
  });
});
