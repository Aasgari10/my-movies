const profile = require('./profileController');
const interaction = require('./interactionController');
const search = require('./searchController');

module.exports = {
  ...profile,
  ...interaction,
  ...search,
};