module.exports = function (schema) {
  schema.pre('save', function (next) {
    this.updatedAt = Date.now();
    if (this.shares) {
      this.shareCount = this.shares.length;
    }
    if (this.likes) {
      this.likesCount = this.likes.length; // virtual field
    }
    next();
  });
};