const express = require('express');
const router = express.Router();
const show_controller = require('../controllers/showController'),
  search_controller = require('../controllers/searchController'),
  review_controller = require('../controllers/reviewController'),
  { auth } = require('../controllers/authController');

// Search for TV shows
router.get('/search/:searchFor', search_controller.search_tmdb);

// Get details of one episode of a TV show
router.get('/:id/season/:sNum/episode/:eNum', show_controller.episode_detail);

// Get details of one season of a TV show
router.get('/:id/season/:sNum', show_controller.season_detail);

// Get a TV show review
router.get('/:id/review/:revID', review_controller.review_view);

// Get a list of reviews for one TV show
router.get('/:id/reviews', review_controller.reviews_list);

// Create a review for one TV show
router.post('/:id/review', auth, review_controller.review_create);

// Get details of one TV show
router.get('/:id', show_controller.show_detail);

module.exports = router;
