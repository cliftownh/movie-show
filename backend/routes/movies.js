const express = require('express');
const router = express.Router();
const movie_controller = require('../controllers/movieController');

router.get('/:id', movie_controller.movie_detail);

module.exports = router;
