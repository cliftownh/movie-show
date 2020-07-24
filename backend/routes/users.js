const express = require('express');
const router = express.Router(),
  user_controller = require('../controllers/userController'),
  review_controller = require('../controllers/reviewController'),
  auth_controller = require('../controllers/authController');

// Create a new user
router.post('/signup', auth_controller.signup);

// Log in existing user
router.post('/login', auth_controller.login);

// Log out existing user
router.get('/logout', auth_controller.logout);

// Test route to check if user is logged in
router.get('/loggedin', auth_controller.auth, auth_controller.loggedIn);

// Get a list of reviews by one user
router.get('/:id/reviews', review_controller.list);

// Get one user's details
router.get('/:id', user_controller.user_detail);

// List all users
router.get('/', user_controller.user_list);

module.exports = router;
