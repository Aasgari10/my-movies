const Movie = require('../../models/Movie');

const getMyMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ creator: req.user._id })
      .sort({ createdAt: -1 })
      .populate('creator', 'name email avatar');

    res.json({
      success: true,
      count: movies.length,
      data: movies
    });
  } catch (error) {
    console.error('❌ خطا در دریافت فیلم‌های کاربر:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در دریافت فیلم‌های شما'
    });
  }
};

module.exports = getMyMovies;