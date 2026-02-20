const express = require('express');
const router = express.Router();
const publicController = require('../controllers/public');

router.get('/movies/search', publicController.searchMovies);
router.get('/movies/filters', publicController.getFilters);
router.get('/movies/popular', publicController.getPopularMovies);

module.exports = router;