'use strict';

const express = require('express');
const router = express.Router();
// const note = require('../controllers/note');
const Note = require('../models/note');
const category = require('../controllers/category');
const Category = require('../models/category');

// middleware params, gets the id and puts it into req.category
router.param('id', (req, res, next, id) => {
  Category.findById(id, (err, category) => {
    if (err) throw err;
    req.category = category;
    Note.find({category: id}, (err, notes) => {
      if (err) throw err;
      req.category.notes = notes;
      next();
    });
  });
});

// show all categories
router.get('/categories', category.index);

// new category form
router.get('/categories/new', category.newCategory);

// routes with route params need to be below static routes
// show all notes in a category
router.get('/categories/:id', category.show);

// //edit category
// router.get('/categories/:id/edit', category.edit);

// //update category after edit
// router.put('/categories/:id', category.update);

// // delete category
// router.delete('/categories/:id', category.destroy);

// post new category to db and redirect to home
router.post('/categories/', category.create);

module.exports = router;
