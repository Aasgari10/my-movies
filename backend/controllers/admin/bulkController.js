// controllers/admin/bulkController.js
const User = require('../../models/User');
const Movie = require('../../models/Movie');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';

exports.deleteMultipleUsers = async (req, res) => {
  try {
    const { userIds } = req.body;
    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ success: false, message: 'لیست ID کاربران را ارسال کنید' });
    }

    const users = await User.find({ _id: { $in: userIds } });
    const adminUser = users.find(user => user.email === ADMIN_EMAIL);
    if (adminUser) {
      return res.status(403).json({ success: false, message: 'نمی‌توان ادمین اصلی را حذف کرد' });
    }

    await User.deleteMany({ _id: { $in: userIds } });
    await Movie.deleteMany({ creator: { $in: userIds } });

    res.json({ success: true, message: `${userIds.length} کاربر و فیلم‌هایشان حذف شدند` });
  } catch (error) {
    console.error('❌ deleteMultipleUsers:', error);
    res.status(500).json({ success: false, message: 'خطا در حذف کاربران' });
  }
};

exports.deleteMultipleMovies = async (req, res) => {
  try {
    const { movieIds } = req.body;
    if (!movieIds || !Array.isArray(movieIds) || movieIds.length === 0) {
      return res.status(400).json({ success: false, message: 'لیست ID فیلم‌ها را ارسال کنید' });
    }

    await Movie.deleteMany({ _id: { $in: movieIds } });

    res.json({ success: true, message: `${movieIds.length} فیلم حذف شدند` });
  } catch (error) {
    console.error('❌ deleteMultipleMovies:', error);
    res.status(500).json({ success: false, message: 'خطا در حذف فیلم‌ها' });
  }
};