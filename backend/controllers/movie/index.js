const getAllMovies = require('./getAllMovies');
const getMovieById = require('./getMovieById');
const getMyMovies = require('./getMyMovies');
const createMovie = require('./createMovie');
const updateMovie = require('./updateMovie');
const deleteMovie = require('./deleteMovie');
const getUserMovies = require('./getUserMovies'); // ✅ یک بار
const likeMovie = require('./likeMovie');
const shareMovie = require('./shareMovie');
const getMostShared = require('./getMostShared');
const getShareUsers = require('./getShareUsers');
const test = require('./test');
const uploadTest = require('./uploadTest');

module.exports = {
  getAllMovies,
  getMovieById,
  getMyMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  getUserMovies, // ✅ یک بار
  likeMovie,
  shareMovie,
  getMostShared,
  getShareUsers,
  test,
  uploadTest
};