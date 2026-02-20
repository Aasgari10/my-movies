
exports.getMe = async (req, res) => {
  try {
    res.json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        avatar: req.user.avatar,
        bio: req.user.bio,
        followerCount: req.user.followerCount,
        followingCount: req.user.followingCount,
        savedMoviesCount: req.user.savedMoviesCount,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt,
      },
    });
  } catch (error) {
    console.error('❌ GetMe error:', error);
    res.status(500).json({ success: false, message: 'خطای سرور' });
  }
};