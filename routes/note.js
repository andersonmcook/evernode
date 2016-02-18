'use strict';

const express = require('express');
const router = express.Router();
const note = require('../controllers/note');

// show all notes
router.get('/notes', note.index);

// new note form
router.get('/notes/new', note.newNote);

// routes with route params need to be below static routes
router.get('/notes/:id', note.show);

//edit note
router.get('/notes/:id/edit', note.edit);

//update note after edit
router.put('/notes/:id', note.update);

// delete note
router.delete('/notes/:id', note.destroy);

// post new note to db and redirect to home
router.post('/notes/', note.create);

module.exports = router;
