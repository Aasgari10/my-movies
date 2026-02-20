const Movie = require('../../models/Movie');

// @desc    جستجوی عمومی فیلم‌ها
// @route   GET /api/public/movies/search
exports.searchMovies = async (req, res) => {
  try {
    const { q: searchTerm, page = 1, limit = 10, genre, year } = req.query;
    const skip = (page - 1) * limit;

    const query = {};

    if (searchTerm) {
      query.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { director: { $regex: searchTerm, $options: 'i' } },
      ];
    }

    if (genre) query.genre = genre;
    if (year) query.year = parseInt(year);

    const [movies, total] = await Promise.all([
      Movie.find(query)
        .select('title director year rating image genre createdAt')
        .populate('creator', 'name')
        .sort({ rating: -1, createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Movie.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: movies,
      pagination: {
        currentPage: parseInt(page),
        itemsPerPage: parseInt(limit),
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
      filters: { searchTerm: searchTerm || '', genre: genre || '', year: year || '' },
    });
  } catch (error) {
    console.error('❌ searchMovies:', error);
    res.status(500).json({ success: false, message: 'خطا در جستجو' });
  }
};