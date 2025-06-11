const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Kayıt formunu göster
router.get('/register', authController.showRegisterForm);

// Kayıt işlemi
router.post('/register', authController.registerUser);

// Giriş formunu göster
router.get('/login', authController.showLoginForm);

// Giriş işlemi
router.post('/login', authController.loginUser);

// Çıkış işlemi
router.get('/logout', authController.logoutUser);

module.exports = router;
