'use strict';
const Note = require('../models/note');

module.exports = {

  // show form for new note
  newNote (req, res) {
    res.render('new-note');
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
    Note.findById(req.params.id, (err, note) => {
      if (err) res.send('404');
      res.render('show-note', {note: note});
    });
  },

  // delete note based on :id
  destroy (req, res) {
    Note.findByIdAndRemove(req.params.id, (err) => {
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

  // edit note
  edit (req, res) {
    Note.findById(req.params.id, (err, note) => {
      if (err) throw err;
      res.render('new-note', {note: note});
    });
  },

  // update note with edits
  update (req, res) {
    Note.findByIdAndUpdate(req.params.id, req.body, (err, note) => {
      if (err) throw err;
      res.redirect(`/notes/${note._id}`);
    });
  }
};
