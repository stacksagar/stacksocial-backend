const {Schema, model} = require("mongoose");

const PostSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [{type: Schema.Types.ObjectId, ref: "User"}],
    dislikes: [{type: Schema.Types.ObjectId, ref: "User"}],
    comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
  },
  {timestamps: true}
);

const Post = model("Post", PostSchema);
module.exports = Post;
