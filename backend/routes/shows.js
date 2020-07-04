const express = require('express');
const router = express.Router();
const review_controller = require('../controllers/reviewController'),
  { auth } = require('../controllers/authController');

// Get a TV show review
router.get('/:id/review/:revID', review_controller.review_view);

// Get a list of reviews for one TV show
router.get('/:id/reviews', review_controller.reviews_list);

// Create a review for one TV show
router.post('/:id/review', auth, review_controller.review_create);

module.exports = router;
