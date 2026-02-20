const Movie = require('../../models/Movie');

const getUserMovies = async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 20, page = 1 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const movies = await Movie.find({ creator: userId })
      .populate('creator', 'name email avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await Movie.countDocuments({ creator: userId });

    res.json({
      success: true,
      count: movies.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      data: movies,
    });
  } catch (error) {
    console.error('❌ خطا در دریافت فیلم‌های کاربر:', error);
    res.status(500).json({ success: false, message: 'خطا در دریافت فیلم‌ها' });
  }
};

module.exports = getUserMovies;