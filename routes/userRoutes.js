// userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controller/userController'); // Impor userController

// Route untuk pendaftaran pengguna
router.post('/register', userController.registerUser);

// Route untuk login pengguna
router.post('/login', userController.loginUser);

module.exports = router;