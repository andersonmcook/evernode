'use strict';

const Note = require('../models/note');
const Category = require('../models/category');

module.exports = {

  // show form for new note
  newNote (req, res) {
    Category.find({}, (err, categories) => {
      if (err) throw err;
      res.render('new-note', {categories: categories});
    })
  },

  // create note in db and redirect
  create (req, res) {
    Note.create(req.body, (err, note) => {
      if (err) throw err;
      res.redirect(`/notes/${note._id}`);
    });
  },

  // show note based on :id
  show (req, res) {
    res.render('show-note', {note: req.note});
  },

  // delete note based on :id
  destroy (req, res) {
    req.note.remove((err) => {
      if (err) throw err;
      res.redirect('/notes');
    });
  },

  // show all notes
  index (req, res) {
    Note.find({}, (err, notes) => {
      if (err) throw err;
      res.render('notes-index', {notes: notes});
    });
  },

  // show form for edit note
  edit (req, res) {
    Category.find({}, (err, categories) => {
      if (err) throw err;
      res.render('new-note', {note: req.note, categories: categories});
    });
  },

  // update note with edits
  update (req, res) {
    req.note.update(req.body, (err, note) => {
      if (err) throw err;
      res.redirect(`/notes/${req.note._id}`);
    });
  }
};
