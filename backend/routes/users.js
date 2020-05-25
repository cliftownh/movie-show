const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');

// List all users
router.get('/', user_controller.user_list);

// Create a new user
router.post('/signup', user_controller.user_signup);

// Log in existing user
router.post('/login', user_controller.user_login);

// Log in existing user
router.get('/logout', user_controller.user_logout);

// Get one user's details
router.get('/:id', user_controller.user_detail);

module.exports = router;
