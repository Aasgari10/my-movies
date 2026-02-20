const Movie = require('../../models/Movie');
const Comment = require('../../models/Comment');

exports.test = (req, res) => {
  res.json({
    success: true,
    message: 'Movies Routes کار می‌کنند! 🎬',
    hasMovieModel: !!Movie,
    hasCommentModel: !!Comment,
    timestamp: new Date().toISOString(),
  });
};

exports.uploadTest = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'هیچ فایلی آپلود نشد',
        hint: 'فیلد باید نامش "image" باشد و Type: File',
      });
    }

    res.json({
      success: true,
      message: 'آپلود به Cloudinary موفقیت‌آمیز بود! ☁️',
      file: {
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        path: req.file.path,
        filename: req.file.filename,
        size: req.file.size,
        cloudinaryUrl: req.file.path,
      },
    });
  } catch (error) {
    console.error('❌ Upload test error:', error);
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'فقط یک فایل با نام "image" مجاز است',
      });
    }
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'حجم فایل نباید بیشتر از ۱۰ مگابایت باشد',
      });
    }
    res.status(500).json({ success: false, message: 'خطا در آپلود فایل' });
  }
};