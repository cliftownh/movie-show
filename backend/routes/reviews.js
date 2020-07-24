const express = require('express');
const router = express.Router(),
  review_controller = require('../controllers/reviewController'),
  { auth } = require('../controllers/authController');

// Update a movie review
router.put('/:id', auth, review_controller.update);

// Get a specific review
router.get('/:id', review_controller.view);

// Get a list of reviews for one movie
router.get('list/:id', review_controller.list);

// Create a review
router.post('/:id', auth, review_controller.create);

module.exports = router;
