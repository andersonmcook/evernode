'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const note = require('./routes/note');
const app = express();
const PORT = process.env.PORT || 3000;

//use /note routes
app.use(note);

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

//connect database then listen to server
mongoose.connect('mongodb://localhost:27017/evernode', (err) => {
  if (err) throw err;
  app.listen(PORT, ()=>{
    console.log(`Evernode running on port: ${PORT}`);
  });
});
