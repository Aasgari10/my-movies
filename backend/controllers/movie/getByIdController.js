const mongoose = require('mongoose');
const Movie = require('../../models/Movie');
const User = require('../../models/User');
const { enrichMovie, getUserFromToken } = require('./helpers');

exports.getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'شناسه فیلم نامعتبر است' });
    }

    const movie = await Movie.findById(id)
      .populate('creator', 'name email avatar followers following followerCount followingCount')
      .lean();

    if (!movie) {
      return res.status(404).json({ success: false, message: 'فیلم پیدا نشد' });
    }

    let likes = [];
    if (movie.likes?.length) {
      likes = await User.find({ _id: { $in: movie.likes } })
        .select('name email avatar')
        .lean();
    }

    let shares = [];
    if (movie.shares?.length) {
      const shareUserIds = movie.shares.map((s) => s.user);
      const shareUsers = await User.find({ _id: { $in: shareUserIds } })
        .select('name email avatar')
        .lean();
      shares = movie.shares.map((share, i) => ({
        user: shareUsers[i] || null,
        sharedAt: share.sharedAt,
      }));
    }

    const currentUser = await getUserFromToken(req.headers.authorization);
    const userInteraction = currentUser
      ? {
          liked: movie.likes?.some((id) => id.toString() === currentUser._id.toString()) || false,
          shared: movie.shares?.some((s) => s.user.toString() === currentUser._id.toString()) || false,
        }
      : { liked: false, shared: false };

    res.json({
      success: true,
      data: {
        ...enrichMovie(movie),
        likes: likes.map((u) => ({ id: u._id, name: u.name, email: u.email, avatar: u.avatar })),
        shares,
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