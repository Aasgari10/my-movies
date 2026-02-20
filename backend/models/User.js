const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },


    avatar: {
  type: String,
  default: '/uploads/images/default-avatar.jpg', 
},
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    avatar: {
      type: String,
      default: 'uploads/images/default-avatar.jpg'
    },
    bio: {
      type: String,
      maxlength: 500,
      default: ''
    },
    favoriteMovies: [
      {
        type: String
      }
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    savedMovies: [
      {
        movie: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Movie'
        },
        savedAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtuals
userSchema.virtual('followerCount').get(function () {
  return this.followers?.length || 0;
});
userSchema.virtual('followingCount').get(function () {
  return this.following?.length || 0;
});
userSchema.virtual('savedMoviesCount').get(function () {
  return this.savedMovies?.length || 0;
});

module.exports = mongoose.model('User', userSchema);