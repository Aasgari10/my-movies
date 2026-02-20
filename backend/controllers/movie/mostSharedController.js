const Movie = require('../../models/Movie');

exports.getMostShared = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const movies = await Movie.find()
      .sort({ shareCount: -1, likesCount: -1 })
      .limit(parseInt(limit))
      .populate('creator', 'name email avatar')
      .select('title image shareCount likesCount rating year director genre createdAt')
      .lean();

    res.json({
      success: true,
      count: movies.length,
      data: movies.map((m) => ({
        id: m._id,
        title: m.title,
        image: m.image,
        year: m.year,
        director: m.director,
        genre: m.genre,
        rating: m.rating || 0,
        shareCount: m.shareCount || 0,
        likesCount: m.likes?.length || 0,
        creator: m.creator
          ? {
              id: m.creator._id,
              name: m.creator.name,
              email: m.creator.email,
              avatar: m.creator.avatar,
            }
          : null,
        createdAt: m.createdAt,
      })),
    });
  } catch (error) {
    console.error('❌ getMostShared:', error);
    res.status(500).json({ success: false, message: 'خطا در دریافت فیلم‌های پراشتراک' });
  }
};