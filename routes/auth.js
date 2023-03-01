const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
//const auth = require('../middleware/auth');

router.post('/register', authController.registerNewUser);
router.post('/login', authController.loginUser);

module.exports = router;