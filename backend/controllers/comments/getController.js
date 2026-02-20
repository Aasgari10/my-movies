const Comment = require('../../models/Comment');

// @desc    دریافت نظرات یک فیلم
// @route   GET /api/comments/movie/:movieId
exports.getMovieComments = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const [comments, total] = await Promise.all([
      Comment.find({ movie: movieId })
        .populate('user', 'name email avatar')
        .populate('replies.user', 'name email avatar')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Comment.countDocuments({ movie: movieId }),
    ]);

    res.json({
      success: true,
      count: comments.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      data: comments.map((comment) => ({
        id: comment._id,
        text: comment.text,
        user: comment.user
          ? {
              id: comment.user._id,
              name: comment.user.name,
              email: comment.user.email,
              avatar: comment.user.avatar,
            }
          : null,
        likes: comment.likes,
        replies: comment.replies,
        createdAt: comment.createdAt,
      })),
    });
  } catch (error) {
    console.error('❌ getMovieComments:', error);
    res.status(500).json({ success: false, message: 'خطا در دریافت نظرات' });
  }
};