const Comment = require('../../models/Comment');
const Movie = require('../../models/Movie');

// @desc    حذف نظر
// @route   DELETE /api/comments/:id
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'نظر پیدا نشد' });
    }

    const isOwner = comment.user.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ success: false, message: 'شما اجازه حذف این نظر را ندارید' });
    }

    await Movie.findByIdAndUpdate(comment.movie, {
      $pull: { comments: comment._id },
    });

    await comment.deleteOne();

    res.json({ success: true, message: 'نظر با موفقیت حذف شد' });
  } catch (error) {
    console.error('❌ deleteComment:', error);
    res.status(500).json({ success: false, message: 'خطا در حذف نظر' });
  }
};