const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const authController = require('../controllers/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', protect, authController.getMe);


router.get('/test', (req, res) => {
  res.json({ message: 'Auth Routes کار می‌کند!' });
});

module.exports = router;

