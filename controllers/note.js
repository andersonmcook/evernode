'use strict';
const Note = require('../models/note');

// show form for new note
module.exports.newNote = (req, res) => {
  res.render('new-note');
};

// create note in db and redirect
module.exports.create = (req, res) => {
  Note.create(req.body, (err, note) => {
    if (err) throw err;
    res.redirect(`/notes/${note._id}`);
  });
};

// show note based on :id
module.exports.show = (req, res) => {
  Note.findById(req.params.id, (err, note) => {
    if (err) res.send('404');
    res.render('show-note', {note: note});
  });
};

// delete note based on :id
module.exports.destroy = (req, res) => {
  Note.findByIdAndRemove(req.params.id, (err) => {
    if (err) throw err;
    res.redirect('/notes');
  });
};

// show all notes
module.exports.index = (req, res) => {
  Note.find({}, (err, notes) => {
    if (err) throw err;
    res.render('notes-index', {notes: notes});
  });
};
