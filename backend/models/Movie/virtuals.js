module.exports = function (schema) {
  schema.virtual('likesCount').get(function () {
    return this.likes ? this.likes.length : 0;
  });

  schema.virtual('commentsCount').get(function () {
    return this.comments ? this.comments.length : 0;
  });

  schema.set('toObject', { virtuals: true });
  schema.set('toJSON', { virtuals: true });
};