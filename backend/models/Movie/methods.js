module.exports = function (schema) {
  schema.methods.likeMovie = function (userId) {
    if (!this.likes.includes(userId)) {
      this.likes.push(userId);
    }
    return this.save();
  };

  schema.methods.unlikeMovie = function (userId) {
    this.likes = this.likes.filter(id => id.toString() !== userId.toString());
    return this.save();
  };

  schema.methods.shareMovie = function (userId) {
    const alreadyShared = this.shares.some(
      share => share.user.toString() === userId.toString()
    );
    if (!alreadyShared) {
      this.shares.push({ user: userId });
      this.shareCount = this.shares.length;
    }
    return this.save();
  };

  schema.methods.unshareMovie = function (userId) {
    this.shares = this.shares.filter(
      share => share.user.toString() !== userId.toString()
    );
    this.shareCount = this.shares.length;
    return this.save();
  };

  schema.methods.hasShared = function (userId) {
    return this.shares.some(
      share => share.user.toString() === userId.toString()
    );
  };

  schema.methods.getSharesInfo = async function () {
    const User = require('../User');
    const shareUsers = await User.find({
      '_id': { $in: this.shares.map(share => share.user) }
    }).select('name email avatar');
    return {
      count: this.shareCount,
      shares: this.shares.map((share, index) => ({
        user: shareUsers[index] || null,
        sharedAt: share.sharedAt
      }))
    };
  };
};