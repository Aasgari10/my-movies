const search = require('./searchController');
const filters = require('./filtersController');
const popular = require('./popularController');

module.exports = {
  ...search,
  ...filters,
  ...popular,
};