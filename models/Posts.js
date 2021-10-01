//* Title, Body, Author, Tags, thumbnail, readTime, Likes, Dislikes, Comments
const { Schema, model } = require('mongoose');
const Comments = require('./Comment');
const User = require('./User');

const postsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    thumbnail: String,
    readTime: String,
    dislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
  },
  { timestamps: true }
);

const Posts = model('Posts', postsSchema);
module.exports = Posts;