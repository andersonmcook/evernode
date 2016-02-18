'use strict';

const express = require('express');
const router = express.Router();
const Note = require('../models/note');

router.get('/notes/new', (req, res) => {
  res.render('new-note');
});

// post new note to db and redirect to home
router.post('/notes', (req, res) => {
  Note.create(req.body, (err, note) => {
    if (err) throw err;
    res.redirect(`/notes/${note._id}`);
  });
});

// routes with route params need to be below static routes
router.get('/notes/:id', (req, res) => {
  Note.findById(req.params.id, (err, note) => {
    if (err) res.send('404');
    res.render('show-note', {note: note});
  });
});

module.exports = router;
