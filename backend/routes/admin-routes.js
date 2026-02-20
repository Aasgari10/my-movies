const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const adminController = require('../controllers/admin');
const adminCommentController = require('../controllers/admin/adminCommentController');

// همه routeهای این فایل نیاز به احراز هویت و سطح ادمین دارند
router.use(protect, admin);

// ======================
// 🧪 تست
// ======================
router.get('/test', adminController.test);

// ======================
// 📊 آمار سیستم
// ======================
router.get('/stats', adminController.getStats);

// ======================
// 👥 مدیریت کاربران
// ======================
router.get('/users', adminController.getUsers);
router.get('/users/:id', adminController.getUser);
router.delete('/users/:id', adminController.deleteUser);
router.patch('/users/:id/role', adminController.updateUserRole);
router.delete('/users', adminController.deleteMultipleUsers); // حذف دسته‌ای

// ======================
// 🎬 مدیریت فیلم‌ها
// ======================
router.get('/movies', adminController.getMovies);
router.delete('/movies/:id', adminController.deleteMovie);
router.delete('/movies', adminController.deleteMultipleMovies); // حذف دسته‌ای

// ======================
// 💬 مدیریت نظرات (جدید)
// ======================
router.get('/comments', adminCommentController.getComments);          // دریافت نظرات با فیلتر
router.patch('/comments/:id/approve', adminCommentController.approveComment); // تأیید نظر
router.delete('/comments/:id', adminCommentController.deleteComment); // حذف نظر

module.exports = router;    