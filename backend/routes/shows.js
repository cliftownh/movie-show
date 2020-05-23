const express = require('express');
const router = express.Router();
const show_controller = require('../controllers/showController');

// Get details of one TV show
router.get('/:id', show_controller.show_detail);

// Get details of one season of a TV show
router.get('/:id/season/:sNum', show_controller.season_detail);

// Get details of one episode of a TV show
router.get('/:id/season/:sNum/episode/:eNum', show_controller.episode_detail);

module.exports = router;
