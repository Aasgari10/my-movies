const Movie = require('../../models/Movie');

const getAllMovies = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      sort = '-createdAt',
      genre,
      year,
      search,
      creator
    } = req.query;

    const query = {};

    if (genre) query.genre = genre;
    if (year) query.year = parseInt(year);
    if (creator) query.creator = creator;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { director: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const movies = await Movie.find(query)
      .populate('creator', 'name email avatar')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Movie.countDocuments(query);

    res.json({
      success: true,
      count: movies.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      data: movies
    });
  } catch (error) {
    console.error('❌ خطا در دریافت فیلم‌ها:', error);
    res.status(500).json({ success: false, message: 'خطا در دریافت فیلم‌ها' });
  }
};

module.exports = getAllMovies;