// controllers/admin/userController.js
const User = require('../../models/User');
const Movie = require('../../models/Movie');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com'; // مقدار پیش‌فرض فقط برای توسعه

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, users });
  } catch (error) {
    console.error('❌ getUsers:', error);
    res.status(500).json({ success: false, message: 'خطا در دریافت کاربران' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'کاربر پیدا نشد' });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error('❌ getUser:', error);
    res.status(500).json({ success: false, message: 'خطا در دریافت کاربر' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'کاربر پیدا نشد' });
    }

    if (user.email === ADMIN_EMAIL) {
      return res.status(403).json({ success: false, message: 'نمی‌توان ادمین اصلی را حذف کرد' });
    }

    await Movie.deleteMany({ creator: user._id });
    await user.deleteOne();

    res.json({ success: true, message: 'کاربر و تمام فیلم‌هایش با موفقیت حذف شدند' });
  } catch (error) {
    console.error('❌ deleteUser:', error);
    res.status(500).json({ success: false, message: 'خطا در حذف کاربر' });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!role || !['user', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, message: 'نقش نامعتبر. فقط user یا admin مجاز است' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'کاربر پیدا نشد' });
    }

    user.role = role;
    await user.save();

    res.json({
      success: true,
      message: `نقش کاربر به "${role}" تغییر یافت`,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('❌ updateUserRole:', error);
    res.status(500).json({ success: false, message: 'خطا در تغییر نقش کاربر' });
  }
};