const User = require('../../models/User');

exports.searchUsers = async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const query = {};

    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
      ];
    }

    const [users, total] = await Promise.all([
      User.find(query).select('name email avatar').skip(skip).limit(parseInt(limit)),
      User.countDocuments(query),
    ]);

    res.json({
      success: true,
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit),
      users,
    });
  } catch (error) {
    console.error('❌ searchUsers:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در جستجوی کاربران',
    });
  }
};