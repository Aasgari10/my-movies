const Movie = require('../../models/Movie');

// @desc    دریافت فیلم‌های پرطرفدار (بر اساس امتیاز)
// @route   GET /api/public/movies/popular
exports.getPopularMovies = async (req, res) => {
  try {
    const movies = await Movie.find()
      .select('title director year rating image genre')
      .sort({ rating: -1, createdAt: -1 })
      .limit(10);

    res.json({ success: true, data: movies });
  } catch (error) {
    console.error('❌ getPopularMovies:', error);
    res.status(500).json({ success: false, message: 'خطا در دریافت فیلم‌های پرطرفدار' });
  }
};