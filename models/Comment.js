//* post, user body, replies

const {Schema, model} = require("mongoose");
const commentSchema = new Schema(
  {
    body: {
      type: String,
      trim: true,
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },

    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reply",
        required: true,
      },
    ],
  },
  {timestamps: true}
);

const Comment = model("Comment", commentSchema);
module.exports = Comment;
