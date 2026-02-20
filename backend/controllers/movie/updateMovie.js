const Movie = require('../../models/Movie');

const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ success: false, message: 'فیلم یافت نشد' });
    }

    // بررسی مالکیت
    if (movie.creator.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'شما اجازه ویرایش این فیلم را ندارید' });
    }

    const { title, description, year, director, genre, rating } = req.body;

    // به‌روزرسانی فیلدها – از مقدار جدید استفاده کن حتی اگر خالی باشد
    movie.title = title;
    movie.description = description;
    movie.director = director;
    movie.genre = genre;

    // تبدیل سال به عدد
    if (year !== undefined) {
      const yearNum = parseInt(year);
      if (!isNaN(yearNum)) movie.year = yearNum;
    }

    // تبدیل امتیاز به عدد
    if (rating !== undefined && rating !== '') {
      const ratingNum = parseFloat(rating);
      if (!isNaN(ratingNum)) movie.rating = ratingNum;
    } else {
      movie.rating = 0; // اگر خالی بود، صفر شود
    }

    // به‌روزرسانی تصویر در صورت آپلود جدید
    if (req.file) {
      movie.image = req.file.path;
    }

    await movie.save();
    await movie.populate('creator', 'name email avatar');

    res.json({
      success: true,
      message: 'فیلم با موفقیت ویرایش شد',
      data: movie
    });
  } catch (error) {
    console.error('❌ خطا در ویرایش فیلم:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'شناسه فیلم نامعتبر است' });
    }
    res.status(500).json({ success: false, message: 'خطا در ویرایش فیلم' });
  }
};

module.exports = updateMovie;