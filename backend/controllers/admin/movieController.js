const Movie = require('../../models/Movie');

exports.getMovies = async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '' } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { director: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ],
      };
    }

    const [total, movies] = await Promise.all([
      Movie.countDocuments(query),
      Movie.find(query)
        .populate('creator', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
    ]);

    res.json({
      success: true,
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit),
      movies,
    });
  } catch (error) {
    console.error('❌ getMovies:', error);
    res.status(500).json({ success: false, message: 'خطا در دریافت فیلم‌ها' });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ success: false, message: 'فیلم پیدا نشد' });
    }

    await movie.deleteOne();

    res.json({
      success: true,
      message: 'فیلم با موفقیت حذف شد',
      movie: { id: movie._id, title: movie.title, director: movie.director },
    });
  } catch (error) {
    console.error('❌ deleteMovie:', error);
    res.status(500).json({ success: false, message: 'خطا در حذف فیلم' });
  }
};