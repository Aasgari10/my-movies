


module.exports = function (schema) {
  schema.index({ title: 'text', director: 'text', description: 'text' });
  schema.index({ genre: 1 });
  schema.index({ year: -1 });
  schema.index({ rating: -1 });
  schema.index({ shareCount: -1 });
  // ایندکس روی likesCount غیرفعال چون فیلد واقعی نیست
};