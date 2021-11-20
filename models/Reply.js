//* post, user body, replies

const {Schema, model} = require("mongoose");
const replySchema = new Schema(
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

    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
  },
  {timestamps: true}
);

const Reply = model("Reply", replySchema);
module.exports = Reply;
