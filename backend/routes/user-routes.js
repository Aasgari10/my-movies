const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); // ✅ اضافه شد
const userController = require('../controllers/user');

// مسیرهای عمومی
router.get('/search', userController.searchUsers);
router.get('/:id', userController.getUserById);

// مسیرهای محافظت‌شده
router.get('/test', protect, userController.test);
router.post('/:id/follow', protect, userController.followUser);
router.post('/movies/:id/save', protect, userController.toggleSaveMovie);
router.get('/suggestions', protect, userController.getSuggestions);

// ✅ مسیر آپلود آواتار
router.patch('/profile/avatar', protect, upload.single('avatar'), userController.updateAvatar);

module.exports = router;