const express = require('express');
const router = express.Router(),
  review_controller = require('../controllers/reviewController'),
  { auth } = require('../controllers/authController');

// Update a movie review
router.put('/:id/review/:revID', auth, review_controller.review_update);

// Get a specific review
router.get('/:id', review_controller.review_view);

// Get a list of reviews for one movie
router.get('/:id/reviews', review_controller.reviews_list);

// Create a review
router.post('/:id', review_controller.review_create);

module.exports = router;
