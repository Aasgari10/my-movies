const User = require('../../models/User');
const Movie = require('../../models/Movie');

exports.getStats = async (req, res) => {
  try {
    const [totalUsers, totalMovies, recentUsers, recentMovies] = await Promise.all([
      User.countDocuments(),
      Movie.countDocuments(),
      User.find().sort({ createdAt: -1 }).limit(5).select('name email role createdAt'),
      Movie.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('creator', 'name email')
        .select('title director year createdAt'),
    ]);

    res.json({
      success: true,
      stats: { totalUsers, totalMovies, recentUsers, recentMovies },
    });
  } catch (error) {
    console.error('❌ getStats:', error);
    res.status(500).json({ success: false, message: 'خطا در دریافت آمار' });
  }
};