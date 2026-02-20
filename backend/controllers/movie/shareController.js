const Movie = require('../../models/Movie');

exports.shareMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ success: false, message: 'فیلم پیدا نشد' });
    }

    const alreadyShared = movie.shares.some((s) => s.user.toString() === req.user._id.toString());

    if (alreadyShared) {
      movie.shares = movie.shares.filter((s) => s.user.toString() !== req.user._id.toString());
      movie.shareCount = movie.shares.length;
      await movie.save();
      return res.json({
        success: true,
        message: 'اشتراک حذف شد',
        shared: false,
        shareCount: movie.shareCount,
        movieId: movie._id,
        movieTitle: movie.title,
      });
    } else {
      movie.shares.push({ user: req.user._id, sharedAt: new Date() });
      movie.shareCount = movie.shares.length;
      await movie.save();
      return res.json({
        success: true,
        message: 'فیلم با موفقیت اشتراک‌گذاری شد',
        shared: true,
        shareCount: movie.shareCount,
        movieId: movie._id,
        movieTitle: movie.title,
        sharedAt: new Date(),
      });
    }
  } catch (error) {
    console.error('❌ shareMovie:', error);
    res.status(500).json({ success: false, message: 'خطا در اشتراک‌گذاری فیلم' });
  }
};