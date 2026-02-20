const mongoose = require('mongoose');
const movieSchema = require('./schema');

require('./hooks')(movieSchema);
require('./virtuals')(movieSchema);
require('./indexes')(movieSchema);
require('./methods')(movieSchema);
require('./statics')(movieSchema);

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;