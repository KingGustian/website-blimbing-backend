// routes/userRoutes.js

const express = require('express');
const router = express.Router();
// Perbaiki path ini untuk menunjuk ke folder 'controllers'
const userController = require('../controller/userController');

// Route untuk pendaftaran pengguna
router.post('/register', userController.registerUser);

// Route untuk login pengguna
router.post('/login', userController.loginUser);

module.exports = router;