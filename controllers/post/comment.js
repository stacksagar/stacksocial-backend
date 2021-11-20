const Comment = require("../../models/Comment");
const Post = require("../../models/Post");

const commentController = async (req, res) => {
  const {_id: postID, text} = req.body;
  const userID = req.user._id;

  try {
    const newComment = await new Comment({
      body: text,
      user: userID,
      post: postID,
      replies: [],
    }).save();

    await Post.findByIdAndUpdate(postID, {$push: {comments: newComment._id}});
    const createdComment = await Comment.findById(newComment._id).populate(
      "user",
      "username photo"
    );

    return res.json({comment: createdComment});
  } catch (error) {
    return res.status(422).json({error});
  }
};

module.exports = commentController;
