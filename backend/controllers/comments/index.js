const create = require('./createController');
const update = require('./updateController');
const del = require('./deleteController');
const like = require('./likeController');
const reply = require('./replyController');
const get = require('./getController');

module.exports = {
  ...create,
  ...update,
  ...del,
  ...like,
  ...reply,
  ...get,
};  