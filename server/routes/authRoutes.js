const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

// Rotta per la registrazione
router.post('/register', authController.register);

// Rotta per il login
router.post('/login', authController.login);

// Se desideri proteggere alcune rotte con il middleware di autenticazione
router.get('/dashboard', authMiddleware.verifyToken, authController.profile);

module.exports = router;
