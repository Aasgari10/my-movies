const test = require('./testController');
const stats = require('./statsController');
const user = require('./userController');
const movie = require('./movieController');
const bulk = require('./bulkController');

module.exports = {
  ...test,
  ...stats,
  ...user,
  ...movie,
  ...bulk,
};