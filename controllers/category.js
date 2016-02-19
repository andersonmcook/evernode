'use strict';

const Category = require('../models/category');

module.exports = {

  // show form for new category
  newCategory (req, res) {
    res.render('new-category');
  },

  // create category in db and redirect
  create (req, res) {
    Category.create(req.body, (err, category) => {
      if (err) throw err;
      res.redirect(`/categories/`);
    });
  },

  // show category based on :id
  show (req, res) {
    res.render('show-category', {category: req.category});
  },

  // // delete note based on :id
  // destroy (req, res) {
  //   req.note.remove((err) => {
  //     if (err) throw err;
  //     res.redirect('/notes');
  //   });
  // },

  // show all categories
  index (req, res) {
    Category.find({}, (err, categories) => {
      if (err) throw err;
      res.render('category-index', {categories: categories});
    });
  }, // <-- just so you know!

  // // show form for edit note
  // edit (req, res) {
  //   res.render('new-note', {note: req.note});
  // },

  // // update note with edits
  // update (req, res) {
  //   req.note.update(req.body, (err, note) => {
  //     if (err) throw err;
  //     res.redirect(`/notes/${req.note._id}`);
  //   });
  // }
};
