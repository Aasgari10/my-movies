const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const enrichMovie = (movie) => ({
  id: movie._id,
  title: movie.title,
  description: movie.description,
  year: movie.year,
  director: movie.director,
  genre: movie.genre,
  image: movie.image,
  rating: movie.rating || 0,
  likes: movie.likes || [],
  likesCount: movie.likes?.length || 0,
  shares: movie.shares || [],
  shareCount: movie.shareCount || 0,
  comments: movie.comments || [],
  commentsCount: movie.comments?.length || 0,
  creator: movie.creator
    ? {
        id: movie.creator._id,
        name: movie.creator.name,
        email: movie.creator.email,
        avatar: movie.creator.avatar,
        followerCount: movie.creator.followerCount,
        followingCount: movie.creator.followingCount,
      }
    : null,
  createdAt: movie.createdAt,
  updatedAt: movie.updatedAt,
});

const enrichMovieLean = (movie) => ({
  ...enrichMovie(movie),
  creator: movie.creator
    ? {
        id: movie.creator._id,
        name: movie.creator.name,
        email: movie.creator.email,
        avatar: movie.creator.avatar,
      }
    : null,
});

const getUserFromToken = async (authorization) => {
  if (!authorization) return null;
  try {
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return await User.findById(decoded.id);
  } catch {
    return null;
  }
};

module.exports = {
  enrichMovie,
  enrichMovieLean,
  getUserFromToken,
};