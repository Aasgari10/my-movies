const Movie = require('../../models/Movie');
const { enrichMovie } = require('./helpers');

exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ success: false, message: 'فیلم پیدا نشد' });
    }

    if (movie.creator.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'شما اجازه ویرایش این فیلم را ندارید' });
    }

    if (req.body.title) movie.title = req.body.title.trim();
    if (req.body.description) movie.description = req.body.description.trim();
    if (req.body.year) movie.year = parseInt(req.body.year);
    if (req.body.director) movie.director = req.body.director.trim();
    if (req.body.genre) movie.genre = req.body.genre;
    if (req.body.rating) {
      const rating = parseFloat(req.body.rating);
      if (rating >= 0 && rating <= 10) movie.rating = rating;
    }
    if (req.file) movie.image = req.file.path;

    movie.updatedAt = new Date();
    await movie.save();
    await movie.populate('creator', 'name email avatar');

    res.json({
      success: true,
      message: 'فیلم با موفقیت ویرایش شد',
      data: enrichMovie(movie),
    });
  } catch (error) {
    console.error('❌ updateMovie:', error);
    res.status(500).json({ success: false, message: 'خطا در ویرایش فیلم' });
  }
};