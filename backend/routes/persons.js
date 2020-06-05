const express = require('express');
const router = express.Router();
const person_controller = require('../controllers/personController'),
  search_controller = require('../controllers/searchController');

// Search for people(cast & crew)
router.get('/search/:searchFor', search_controller.search_tmdb);

// Get details of one person
router.get('/:id', person_controller.person_detail);

module.exports = router;
