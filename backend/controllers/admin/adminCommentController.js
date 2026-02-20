const Comment = require('../../models/Comment');

/**
 * دریافت همه نظرات (با فیلتر وضعیت تأیید)
 * GET /api/admin/comments
 */
exports.getComments = async (req, res) => {
  try {
    const { page = 1, limit = 10, isApproved, movieId } = req.query;
    const query = {};

    if (isApproved !== undefined) {
      query.isApproved = isApproved === 'true';
    }
    if (movieId) {
      query.movie = movieId;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const comments = await Comment.find(query)
      .populate('user', 'name email avatar')
      .populate('movie', 'title')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await Comment.countDocuments(query);

    res.json({
      success: true,
      comments,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      total,
    });
  } catch (error) {
    console.error('❌ خطا در دریافت نظرات (ادمین):', error);
    res.status(500).json({ success: false, message: 'خطا در دریافت نظرات' });
  }
};

/**
 * تأیید نظر (تنظیم isApproved به true)
 * PATCH /api/admin/comments/:id/approve
 */
exports.approveComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    ).populate('user', 'name email avatar');

    if (!comment) {
      return res.status(404).json({ success: false, message: 'نظر یافت نشد' });
    }

    res.json({
      success: true,
      message: 'نظر با موفقیت تأیید شد',
      comment,
    });
  } catch (error) {
    console.error('❌ خطا در تأیید نظر:', error);
    res.status(500).json({ success: false, message: 'خطا در تأیید نظر' });
  }
};

/**
 * حذف نظر
 * DELETE /api/admin/comments/:id
 */
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);

    if (!comment) {
      return res.status(404).json({ success: false, message: 'نظر یافت نشد' });
    }

    res.json({
      success: true,
      message: 'نظر با موفقیت حذف شد',
    });
  } catch (error) {
    console.error('❌ خطا در حذف نظر:', error);
    res.status(500).json({ success: false, message: 'خطا در حذف نظر' });
  }
};