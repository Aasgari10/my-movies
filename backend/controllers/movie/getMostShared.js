const Movie = require('../../models/Movie');

const getMostShared = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const movies = await Movie.find({ 'shares.0': { $exists: true } })
      .sort({ 'shares.length': -1, createdAt: -1 })
      .limit(parseInt(limit))
      .populate('creator', 'name email avatar');

    res.json({
      success: true,
      count: movies.length,
      data: movies
    });
  } catch (error) {
    console.error('❌ خطا در دریافت فیلم‌های پربازدید:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در دریافت فیلم‌های پربازدید'
    });
  }
};

module.exports = getMostShared;