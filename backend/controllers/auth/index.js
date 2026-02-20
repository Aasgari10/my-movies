const register = require('./registerController');
const login = require('./loginController');
const me = require('./meController');

module.exports = {
  ...register,
  ...login,
  ...me,
};