const Movie = require('../../models/Movie');

exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ success: false, message: 'فیلم پیدا نشد' });
    }

    if (movie.creator.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'شما اجازه حذف این فیلم را ندارید' });
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