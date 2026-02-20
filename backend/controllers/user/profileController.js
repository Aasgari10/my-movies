const User = require('../../models/User');


exports.test = (req, res) => {
  res.json({
    success: true,
    message: 'User Routes کار می‌کنند! 👤',
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
};

exports.followUser = async (req, res) => {
  try {
    const targetId = req.params.id;
    const currentUser = req.user;

    if (targetId === currentUser._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'شما نمی‌توانید خودتان را دنبال کنید',
      });
    }

    const targetUser = await User.findById(targetId);
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: 'کاربر مورد نظر یافت نشد',
      });
    }

    const isFollowing = currentUser.following.some(
      (id) => id.toString() === targetId
    );

    if (isFollowing) {
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== targetId
      );
      targetUser.followers = targetUser.followers.filter(
        (id) => id.toString() !== currentUser._id.toString()
      );
    } else {
      currentUser.following.push(targetId);
      targetUser.followers.push(currentUser._id);
    }

    await Promise.all([currentUser.save(), targetUser.save()]);

    res.json({
      success: true,
      following: !isFollowing,
      followerCount: targetUser.followers.length,
      message: isFollowing ? 'آنفالو شد' : 'دنبال شد',
    });
  } catch (error) {
    console.error('❌ followUser:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در عملیات دنبال کردن',
    });
  }
};


/**
 * آپلود/تغییر تصویر پروفایل
 */
exports.updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'لطفاً یک تصویر انتخاب کنید' 
      });
    }

    // آدرس تصویر آپلود شده (Cloudinary یا آدرس محلی)
    const avatarUrl = req.file.path;

    // به‌روزرسانی کاربر فعلی
    req.user.avatar = avatarUrl;
    await req.user.save();

    res.json({
      success: true,
      message: 'تصویر پروفایل با موفقیت به‌روزرسانی شد',
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
        role: req.user.role
      }
    });
  } catch (error) {
    console.error('❌ خطا در آپلود آواتار:', error);
    res.status(500).json({ 
      success: false, 
      message: 'خطا در آپلود تصویر' 
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('followers', 'name email avatar')
      .populate('following', 'name email avatar');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'کاربر پیدا نشد',
      });
    }

    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        bio: user.bio,
        followers: user.followers,
        following: user.following,
        followerCount: user.followerCount,
        followingCount: user.followingCount,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error('❌ getUserById:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'شناسه کاربر نامعتبر است',
      });
    }
    res.status(500).json({
      success: false,
      message: 'خطا در دریافت اطلاعات کاربر',
    });
  }
};