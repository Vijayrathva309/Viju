// models/Post.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    max: 500,
  },
  image: {
    type: String,
  },
  likes: {
    type: Array,
    default: [],
  },
  comments: [{
    userId: String,
    text: String,
    userProfilePic: String,
    username: String,
    createdAt: Date,
  }],
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);