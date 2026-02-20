const Movie = require('../../models/Movie');

const createMovie = async (req, res) => {
  try {
    const { title, description, year, director, genre, rating } = req.body;
    const image = req.file?.path || null;

    // اعتبارسنجی ساده
    if (!title || !description || !year || !director) {
      return res.status(400).json({
        success: false,
        message: 'لطفاً تمام فیلدهای ضروری را پر کنید'
      });
    }

    // اگر genre ارسال نشده یا null/undefined باشد، مقدار پیش‌فرض 'other' را تنظیم کن
    const finalGenre = genre && typeof genre === 'string' && genre.trim() !== '' ? genre.trim() : 'other';

    const movie = new Movie({
      title,
      description,
      year,
      director,
      genre: finalGenre,  // دیگر null ارسال نمی‌شود
      rating: rating || null,
      image,
      creator: req.user._id
    });

    await movie.save();

    // دریافت اطلاعات کامل سازنده
    await movie.populate('creator', 'name email avatar');

    res.status(201).json({
      success: true,
      message: 'فیلم با موفقیت ایجاد شد',
      data: movie
    });
  } catch (error) {
    console.error('❌ خطا در ایجاد فیلم:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در ایجاد فیلم'
    });
  }
};

module.exports = createMovie;