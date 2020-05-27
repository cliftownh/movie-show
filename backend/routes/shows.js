const express = require('express');
const router = express.Router();
const show_controller = require('../controllers/showController'),
  search_controller = require('../controllers/searchController'),
  review_controller = require('../controllers/reviewController');

// Search for TV shows
router.get('/search/:searchFor', search_controller.search);

// Get details of one TV show
router.get('/:id', show_controller.show_detail);

// Get details of one season of a TV show
router.get('/:id/season/:sNum', show_controller.season_detail);

// Get details of one episode of a TV show
router.get('/:id/season/:sNum/episode/:eNum', show_controller.episode_detail);

// Get a TV show review
router.get('/:id/review/:revID', review_controller.review_view);

module.exports = router;
