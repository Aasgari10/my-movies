const Comment = require('../../models/Comment');

// @desc    لایک/آنلایک نظر
// @route   POST /api/comments/:id/like
exports.likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'نظر پیدا نشد' });
    }

    const userId = req.user._id;
    const alreadyLiked = comment.likes.some((id) => id.toString() === userId.toString());

    if (alreadyLiked) {
      comment.likes = comment.likes.filter((id) => id.toString() !== userId.toString());
      await comment.save();
      return res.json({
        success: true,
        message: 'لایک حذف شد',
        liked: false,
        likesCount: comment.likes.length,
      });
    } else {
      comment.likes.push(userId);
      await comment.save();
      return res.json({
        success: true,
        message: 'نظر لایک شد',
        liked: true,
        likesCount: comment.likes.length,
      });
    }
  } catch (error) {
    console.error('❌ likeComment:', error);
    res.status(500).json({ success: false, message: 'خطا در لایک کردن نظر' });
  }
};