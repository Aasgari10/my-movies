const Movie = require('../../models/Movie');

const shareMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ success: false, message: 'فیلم یافت نشد' });
    }

    const userId = req.user._id;
    const existingShare = movie.shares?.find(
      share => share.user.toString() === userId.toString()
    );

    if (existingShare) {
      // لغو اشتراک
      movie.shares = movie.shares.filter(
        share => share.user.toString() !== userId.toString()
      );
    } else {
      // اشتراک‌گذاری
      movie.shares.push({
        user: userId,
        sharedAt: new Date()
      });
    }

    await movie.save();

    res.json({
      success: true,
      shared: !existingShare,
      shareCount: movie.shares.length,
      message: existingShare ? 'اشتراک‌گذاری لغو شد' : 'فیلم اشتراک‌گذاری شد'
    });
  } catch (error) {
    console.error('❌ خطا در اشتراک‌گذاری فیلم:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'شناسه فیلم نامعتبر است' });
    }
    res.status(500).json({ success: false, message: 'خطا در اشتراک‌گذاری' });
  }
};

module.exports = shareMovie;