const express = require('express');
const router = express.Router();
const movie_controller = require('../controllers/movieController'),
  search_controller = require('../controllers/searchController'),
  review_controller = require('../controllers/reviewController');

// Search for movies
router.get('/search/:searchFor', search_controller.search);

// Get details of one movie
router.get('/:id', movie_controller.movie_detail);

// Create a movie review
router.post('/:id/review', review_controller.review_create);

// Get one movie review
router.get('/:id/review/:revID', review_controller.review_view);

module.exports = router;
