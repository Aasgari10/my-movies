const Movie = require('../../models/Movie');

exports.likeMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ success: false, message: 'فیلم پیدا نشد' });
    }

    const alreadyLiked = movie.likes.some((id) => id.toString() === req.user._id.toString());

    if (alreadyLiked) {
      movie.likes = movie.likes.filter((id) => id.toString() !== req.user._id.toString());
      await movie.save();
      return res.json({
        success: true,
        message: 'لایک حذف شد',
        liked: false,
        likesCount: movie.likes.length,
        movieId: movie._id,
      });
    } else {
      movie.likes.push(req.user._id);
      await movie.save();
      return res.json({
        success: true,
        message: 'فیلم لایک شد',
        liked: true,
        likesCount: movie.likes.length,
        movieId: movie._id,
      });
    }
  } catch (error) {
    console.error('❌ likeMovie:', error);
    res.status(500).json({ success: false, message: 'خطا در لایک کردن فیلم' });
  }
};