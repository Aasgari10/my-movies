exports.test = (req, res) => {
  res.json({
    success: true,
    message: 'Admin Routes کار می‌کنند! 👑',
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
    timestamp: new Date().toISOString(),
  });
};