const Comment = require("../../models/Comment");

const getCommentsController = async (req, res) => {
  const {postID} = req.params;

  try {
    const comments = await Comment.find({post: postID})
      .populate("user", "username photo")
      .sort("-createdAt");
    return res.json({comments});
  } catch (error) {
    return res.status(422).json({error});
  }
};
module.exports = getCommentsController;
