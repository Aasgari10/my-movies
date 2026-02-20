const Movie = require('../../models/Movie');

const likeMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ success: false, message: 'فیلم یافت نشد' });
    }

    const userId = req.user._id;
    const hasLiked = movie.likes.includes(userId);

    if (hasLiked) {
      movie.likes = movie.likes.filter(id => id.toString() !== userId.toString());
    } else {
      movie.likes.push(userId);
    }

    await movie.save();

    res.json({
      success: true,
      liked: !hasLiked,
      likesCount: movie.likes.length,
      message: hasLiked ? 'لایک حذف شد' : 'فیلم لایک شد'
    });
  } catch (error) {
    console.error('❌ خطا در لایک فیلم:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'شناسه فیلم نامعتبر است' });
    }
    res.status(500).json({ success: false, message: 'خطا در عملیات لایک' });
  }
};

module.exports = likeMovie;