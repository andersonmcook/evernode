'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const logger = require('./lib/logger')
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const note = require('./routes/note');
const category = require('./routes/category');

const app = express();
const PORT = process.env.PORT || 3000;

// set view engine to jade
app.set('view engine', 'jade');

// bodyParser middleware
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

// this is so we can use DELETE & PUT on a form
app.use(methodOverride('_method'));

// middleware we wrote to log user info to db
app.use(logger);

//home route
app.get('/', (req, res) => {
  res.send('Server Running');
});

//use /notes routes. needs to be below middleware
app.use(note);
//use /categories routes. needs to be below middleware
app.use(category);

//connect database then listen to server
mongoose.connect('mongodb://localhost:27017/evernode', (err) => {
  if (err) throw err;
  app.listen(PORT, ()=>{
    console.log(`Evernode running on port: ${PORT}`);
  });
});
