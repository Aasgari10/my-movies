const Movie = require('../../models/Movie');

const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ success: false, message: 'فیلم یافت نشد' });
    }

    if (movie.creator.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'شما اجازه حذف این فیلم را ندارید' });
    }

    await movie.deleteOne();

    res.json({
      success: true,
      message: 'فیلم با موفقیت حذف شد'
    });
  } catch (error) {
    console.error('❌ خطا در حذف فیلم:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'شناسه فیلم نامعتبر است' });
    }
    res.status(500).json({ success: false, message: 'خطا در حذف فیلم' });
  }
};

module.exports = deleteMovie;