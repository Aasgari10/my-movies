const Comment = require('../../models/Comment');

// @desc    افزودن پاسخ به نظر
// @route   POST /api/comments/:id/replies
exports.addReply = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, message: 'متن پاسخ الزامی است' });
    }

    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'نظر پیدا نشد' });
    }

    const reply = {
      text,
      user: req.user._id,
      createdAt: new Date(),
    };

    comment.replies.push(reply);
    await comment.save();
    await comment.populate('replies.user', 'name email avatar');

    const newReply = comment.replies[comment.replies.length - 1];

    res.status(201).json({
      success: true,
      message: 'پاسخ با موفقیت ثبت شد',
      data: {
        text: newReply.text,
        user: newReply.user
          ? {
              id: newReply.user._id,
              name: newReply.user.name,
              email: newReply.user.email,
              avatar: newReply.user.avatar,
            }
          : null,
        createdAt: newReply.createdAt,
      },
    });
  } catch (error) {
    console.error('❌ addReply:', error);
    res.status(500).json({ success: false, message: 'خطا در ثبت پاسخ' });
  }
};