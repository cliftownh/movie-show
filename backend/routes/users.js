const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');

// List all users
router.get('/', user_controller.user_list);

// Get one user's details
router.get('/:id', user_controller.user_detail);

// Create a new user
router.post('/signup', user_controller.user_signup);

module.exports = router;
