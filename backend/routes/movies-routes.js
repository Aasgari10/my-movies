const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');
const movieController = require('../controllers/movie');

// ======================
// 🧪 تست
// ======================
router.get('/test', movieController.test);
router.post('/upload-test', upload.single('image'), movieController.uploadTest);

// ======================
// 📢 عمومی
// ======================
router.get('/', movieController.getAllMovies);
router.get('/most/shared', movieController.getMostShared);
router.get('/user/:userId', movieController.getUserMovies);
// ✅ مسیر my-movies باید قبل از /:id باشد (حتی اگر نیاز به توکن دارد)
router.get('/my-movies', protect, movieController.getMyMovies);
router.get('/:id', movieController.getMovieById);
router.get('/:id/shares/users', movieController.getShareUsers);
router.post('/test-form', upload.single('image'), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.json({ body: req.body, file: req.file });
});

// ======================
// 🔒 محافظت‌شده (نیاز به توکن)
// ======================
router.post('/', protect, upload.single('image'), movieController.createMovie);
router.put('/:id', protect, upload.single('image'), movieController.updateMovie);
router.delete('/:id', protect, movieController.deleteMovie);
router.post('/:id/like', protect, movieController.likeMovie);
router.post('/:id/share', protect, movieController.shareMovie);

module.exports = router;