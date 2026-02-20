const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { register, login, getMe } = require('../controllers/auth');

// publics 
router.post('/register', register);
router.post('/login', login);

// protected routes
router.get('/me', protect, getMe);

// simple test
router.get('/test', (req, res) => {
  res.json({ message: 'Auth Routes کار می‌کند!' });
});

module.exports = router;