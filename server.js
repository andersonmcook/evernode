'use strict';

// const bodyParser = require('body-parser');
const express = require('express');
// const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Server Running');
});

app.listen(PORT, ()=>{
  console.log(`Evernode running on port: ${PORT}`);
});
