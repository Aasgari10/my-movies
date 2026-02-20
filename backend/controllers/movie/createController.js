const Movie = require('../../models/Movie');
const { enrichMovie } = require('./helpers');

exports.createMovie = async (req, res) => {
  try {
    const requiredFields = ['title', 'description', 'year', 'director'];
    const missingFields = requiredFields.filter((f) => !req.body[f]);
    if (missingFields.length) {
      return res.status(400).json({
        success: false,
        message: `فیلدهای اجباری پر نشده‌اند: ${missingFields.join(', ')}`,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'لطفاً یک عکس برای فیلم انتخاب کنید',
      });
    }

    const movieData = {
      title: req.body.title.trim(),
      description: req.body.description.trim(),
      year: parseInt(req.body.year),
      director: req.body.director.trim(),
      image: req.file.path,
      creator: req.user._id,
      shares: [],
      shareCount: 0,
    };

    if (req.body.genre) movieData.genre = req.body.genre;
    if (req.body.rating) {
      const rating = parseFloat(req.body.rating);
      if (rating >= 0 && rating <= 10) movieData.rating = rating;
    }

    const movie = new Movie(movieData);
    const savedMovie = await movie.save();
    await savedMovie.populate('creator', 'name email avatar');

    res.status(201).json({
      success: true,
      message: 'فیلم با موفقیت ایجاد شد! 🎉',
      data: enrichMovie(savedMovie),
    });
  } catch (error) {
    console.error('❌ createMovie:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'داده‌های نامعتبر',
        errors: Object.keys(error.errors).map((key) => ({
          field: key,
          message: error.errors[key].message,
        })),
      });
    }
    res.status(500).json({ success: false, message: 'خطا در ایجاد فیلم' });
  }
};