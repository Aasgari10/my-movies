const Comment = require('../../models/Comment');

// @desc    ویرایش نظر
// @route   PUT /api/comments/:id
exports.updateComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, message: 'متن نظر الزامی است' });
    }

    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'نظر پیدا نشد' });
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'شما اجازه ویرایش این نظر را ندارید' });
    }

    comment.text = text;
    await comment.save();

    res.json({ success: true, message: 'نظر با موفقیت ویرایش شد', data: comment });
  } catch (error) {
    console.error('❌ updateComment:', error);
    res.status(500).json({ success: false, message: 'خطا در ویرایش نظر' });
  }
};