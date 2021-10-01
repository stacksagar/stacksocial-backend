//* post, user body, replies

const { Schema, model } = require('mongoose');
const Posts = require('./Posts');
const User = require('./User');

const commentsSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Posts',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    body: {
      type: String,
      trim: true,
      required: true,
    },
    replies: [
      {
        body: { type: String, required: true },
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        createAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  { timestamps: true }
);

const Comments = model('Comments', commentsSchema);
module.exports = Comments;
