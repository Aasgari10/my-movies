const Movie = require('../../models/Movie');

const getShareUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const movie = await Movie.findById(req.params.id)
      .populate({
        path: 'shares.user',
        select: 'name email avatar followerCount followingCount',
        options: {
          skip,
          limit: parseInt(limit)
        }
      });

    if (!movie) {
      return res.status(404).json({ success: false, message: 'فیلم یافت نشد' });
    }

    const users = movie.shares.map(share => share.user).filter(Boolean);
    const total = movie.shares.length;

    res.json({
      success: true,
      count: users.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      data: users
    });
  } catch (error) {
    console.error('❌ خطا در دریافت کاربران اشتراک‌گذار:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'شناسه فیلم نامعتبر است' });
    }
    res.status(500).json({
      success: false,
      message: 'خطا در دریافت کاربران اشتراک‌گذار'
    });
  }
};

module.exports = getShareUsers;