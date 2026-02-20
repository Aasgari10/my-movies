const Movie = require('../../models/Movie');
const { enrichMovieLean } = require('./helpers');

exports.getMyMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ creator: req.user._id })
      .populate('creator', 'name email avatar')
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      count: movies.length,
      data: movies.map(enrichMovieLean),
    });
  } catch (error) {
    console.error('❌ getMyMovies:', error);
    res.status(500).json({ success: false, message: 'خطا در دریافت فیلم‌های شما' });
  }
};