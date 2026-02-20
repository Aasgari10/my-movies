const mongoose = require('mongoose');
const Movie = require('../../models/Movie');
const { enrichMovie, getUserFromToken } = require('./helpers');

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'شناسه فیلم نامعتبر است' });
    }

    const movie = await Movie.findById(id)
      .populate('creator', 'name email avatar followerCount followingCount')
      .populate('likes', 'name email avatar')
      .lean();

    if (!movie) {
      return res.status(404).json({ success: false, message: 'فیلم پیدا نشد' });
    }

    // دریافت کاربر جاری از توکن (برای تعاملات)
    const currentUser = await getUserFromToken(req.headers.authorization);

    // غنی‌سازی اطلاعات فیلم
    const enrichedMovie = enrichMovie(movie);

    // افزودن وضعیت تعامل کاربر جاری
    let userInteraction = {};
    if (currentUser) {
      userInteraction = {
        liked: movie.likes?.some((likeId) => likeId.toString() === currentUser._id.toString()) || false,
        shared: movie.shares?.some((share) => share.user.toString() === currentUser._id.toString()) || false,
      };
    }

    res.json({
      success: true,
      data: {
        ...enrichedMovie,
        userInteraction,
      },
    });
  } catch (error) {
    console.error('❌ getMovieById:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'شناسه فیلم نامعتبر است' });
    }
    res.status(500).json({ success: false, message: 'خطا در دریافت فیلم' });
  }
};

module.exports = getMovieById;