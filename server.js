'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const note = require('./routes/note');

const app = express();
const PORT = process.env.PORT || 3000;

// set view engine to jade
app.set('view engine', 'jade');

// bodyParser middleware
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

// this is so we can use DELETE on a form
app.use(methodOverride('_method'));


//home route
app.get('/', (req, res) => {
  res.send('Server Running');
});

//use /note routes. needs to be below middleware
app.use(note);

//connect database then listen to server
mongoose.connect('mongodb://localhost:27017/evernode', (err) => {
  if (err) throw err;
  app.listen(PORT, ()=>{
    console.log(`Evernode running on port: ${PORT}`);
  });
});
