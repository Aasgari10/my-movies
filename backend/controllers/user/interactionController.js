const User = require('../../models/User');

exports.toggleSaveMovie = async (req, res) => {
  try {
    const user = req.user;
    const movieId = req.params.id;

    const alreadySaved = user.savedMovies.some(
      (item) => item.movie.toString() === movieId
    );

    if (alreadySaved) {
      user.savedMovies = user.savedMovies.filter(
        (item) => item.movie.toString() !== movieId
      );
      await user.save();
      res.json({
        success: true,
        saved: false,
        message: 'فیلم از ذخیره‌ها حذف شد',
      });
    } else {
      user.savedMovies.push({ movie: movieId });
      await user.save();
      res.json({
        success: true,
        saved: true,
        message: 'فیلم ذخیره شد',
      });
    }
  } catch (error) {
    console.error('❌ toggleSaveMovie:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در ذخیره فیلم',
    });
  }
};

exports.getSuggestions = async (req, res) => {
  try {
    const currentUser = req.user;

    const users = await User.find({
      _id: { $ne: currentUser._id, $nin: currentUser.following },
    })
      .select('name email avatar bio')
      .sort({ createdAt: -1 })
      .limit(8);

    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error('❌ getSuggestions:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در دریافت کاربران پیشنهادی',
    });
  }
};