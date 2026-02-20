const Comment = require('../../models/Comment');
const Movie = require('../../models/Movie');

exports.createComment = async (req, res) => {
  try {
    const { text, movieId } = req.body;
    
    // اعتبارسنجی ورودی
    if (!text || !movieId) {
      return res.status(400).json({ success: false, message: 'متن نظر و شناسه فیلم الزامی است' });
    }

    // بررسی وجود فیلم
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ success: false, message: 'فیلم پیدا نشد' });
    }

    // ایجاد نظر جدید
    const comment = new Comment({
      text,
      user: req.user._id,
      movie: movieId,
      isApproved: true,
    });

    await comment.save();

    // اضافه کردن نظر به فیلم
    movie.comments.push(comment._id);
    await movie.save();

    // دریافت اطلاعات کاربر
    await comment.populate('user', 'name email avatar');

    res.status(201).json({
      success: true,
      message: 'نظر با موفقیت ثبت شد',
      comment: {
        _id: comment._id,
        text: comment.text,
        user: comment.user ? {
          _id: comment.user._id,
          name: comment.user.name,
          email: comment.user.email,
          avatar: comment.user.avatar,
        } : null,
        likes: comment.likes || [],
        replies: comment.replies || [],
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      },
    });
  } catch (error) {
    // لاگ دقیق خطا برای دیباگ
    console.error('❌ createComment error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      errors: error.errors,
    });
    res.status(500).json({ success: false, message: 'خطا در ثبت نظر' });
  }
};