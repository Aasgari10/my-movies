const Movie = require('../../models/Movie');

// @desc    دریافت فیلترهای موجود (ژانرها و سال‌ها)
// @route   GET /api/public/movies/filters
exports.getFilters = async (req, res) => {
  try {
    const [genres, years] = await Promise.all([
      Movie.distinct('genre'),
      Movie.distinct('year'),
    ]);

    res.json({
      success: true,
      filters: {
        genres: genres.filter(Boolean).sort(),
        years: years.filter(Boolean).sort((a, b) => b - a),
      },
    });
  } catch (error) {
    console.error('❌ getFilters:', error);
    res.status(500).json({ success: false, message: 'خطا در دریافت فیلترها' });
  }
};