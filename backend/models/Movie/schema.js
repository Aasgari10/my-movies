const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'عنوان فیلم الزامی است'],
    trim: true,
    maxlength: [200, 'عنوان نمی‌تواند بیشتر از ۲۰۰ حرف باشد']
  },
  description: {
    type: String,
    required: [true, 'توضیحات الزامی است'],
    maxlength: [1000, 'توضیحات نمی‌تواند بیشتر از ۱۰۰۰ حرف باشد']
  },
  year: {
    type: Number,
    required: [true, 'سال انتشار الزامی است'],
    min: [1888, 'سال باید بعد از ۱۸۸۸ باشد'],
    max: [new Date().getFullYear() + 1, 'سال نمی‌تواند از سال آینده بیشتر باشد']
  },
  director: {
    type: String,
    required: [true, 'نام کارگردان الزامی است'],
    trim: true
  },
  genre: {
    type: String,
    enum: [
      'action', 'drama', 'comedy', 'sci-fi', 'horror', 'romance',
      'thriller', 'documentary', 'animation', 'fantasy', 'adventure',
      'crime', 'mystery', 'biography', 'history', 'war', 'musical',
      'family', 'other'
    ],
    default: 'other',
    lowercase: true
  },
  image: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    min: [0, 'امتیاز نمی‌تواند کمتر از ۰ باشد'],
    max: [10, 'امتیاز نمی‌تواند بیشتر از ۱۰ باشد'],
    default: 0
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  shares: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    sharedAt: {
      type: Date,
      default: Date.now
    },
    _id: false
  }],
  shareCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = movieSchema;