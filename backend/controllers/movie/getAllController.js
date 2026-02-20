const Movie = require('../../models/Movie');
const { enrichMovieLean } = require('./helpers');

exports.getAllMovies = async (req, res) => {
  try {
    const { page = 1, limit = 12, genre, year, search, sort = '-createdAt' } = req.query;
    const skip = (page - 1) * limit;

    const query = {};
    if (genre) query.genre = genre;
    if (year) query.year = parseInt(year);
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { director: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const sortOption = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      rating: { rating: -1 },
      popular: { likesCount: -1, shareCount: -1 },
      shared: { shareCount: -1 },
    }[sort] || { createdAt: -1 };

    const movies = await Movie.find(query)
      .populate('creator', 'name email avatar')
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await Movie.countDocuments(query);

    res.json({
      success: true,
      count: movies.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      data: movies.map(enrichMovieLean),
    });
  } catch (error) {
    console.error('❌ getAllMovies:', error);
    res.status(500).json({ success: false, message: 'خطا در دریافت فیلم‌ها' });
  }
};