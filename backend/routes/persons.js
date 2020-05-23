const express = require('express');
const router = express.Router();
const person_controller = require('../controllers/personController');

router.get('/:id', person_controller.person_detail);

module.exports = router;
