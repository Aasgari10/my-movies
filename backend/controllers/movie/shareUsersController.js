const Movie = require('../../models/Movie');
const User = require('../../models/User');

exports.getShareUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const movie = await Movie.findById(id).select('shares');
    if (!movie) {
      return res.status(404).json({ success: false, message: 'فیلم پیدا نشد' });
    }

    if (!movie.shares?.length) {
      return res.json({
        success: true,
        data: [],
        total: 0,
        page: 1,
        totalPages: 0,
      });
    }

    const userIds = movie.shares.slice(skip, skip + parseInt(limit)).map((s) => s.user);
    const users = await User.find({ _id: { $in: userIds } })
      .select('name email avatar followerCount followingCount createdAt')
      .lean();

    const sortedUsers = userIds.map((id) => users.find((u) => u._id.toString() === id.toString())).filter(Boolean);

    res.json({
      success: true,
      data: sortedUsers.map((u) => ({
        id: u._id,
        name: u.name,
        email: u.email,
        avatar: u.avatar,
        followerCount: u.followerCount || 0,
        followingCount: u.followingCount || 0,
        memberSince: u.createdAt,
      })),
      total: movie.shares.length,
      page: parseInt(page),
      totalPages: Math.ceil(movie.shares.length / limit),
    });
  } catch (error) {
    console.error('❌ getShareUsers:', error);
    res.status(500).json({ success: false, message: 'خطا در دریافت کاربران اشتراک‌گذار' });
  }
};