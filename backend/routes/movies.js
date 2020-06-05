const express = require('express');
const router = express.Router(),
  movie_controller = require('../controllers/movieController'),
  search_controller = require('../controllers/searchController'),
  review_controller = require('../controllers/reviewController'),
  { auth } = require('../controllers/authController');

// Search for movies
router.get('/search/:searchFor', search_controller.search_tmdb);

// Update a movie review
router.put('/:id/review/:revID', auth, review_controller.review_update);

// Get a specific movie review
router.get('/:id/review/:revID', review_controller.review_view);

// Get a list of reviews for one movie
router.get('/:id/reviews', review_controller.reviews_list);

// Create a movie review
router.post('/:id/review', auth, review_controller.review_create);

// Get details of one movie
router.get('/:id', movie_controller.movie_detail);

module.exports = router;
