module.exports = function (schema) {
  schema.statics.getMostShared = async function (limit = 10) {
    return this.find()
      .sort({ shareCount: -1 })
      .limit(limit)
      .populate('creator', 'name email avatar')
      .select('title image shareCount likesCount rating year');
  };

  schema.statics.getStats = async function () {
    const total = await this.countDocuments();
    const genres = await this.aggregate([
      { $group: { _id: '$genre', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    const shareStats = await this.aggregate([
      {
        $project: {
          shareCount: 1,
          title: 1
        }
      },
      { $sort: { shareCount: -1 } },
      { $limit: 5 }
    ]);
    return { total, genres, topSharedMovies: shareStats };
  };

  schema.statics.updateAllShareCounts = async function () {
    const movies = await this.find();
    for (const movie of movies) {
      movie.shareCount = movie.shares ? movie.shares.length : 0;
      await movie.save();
    }
    return { updated: movies.length };
  };
};