const Reply = require("../../models/Reply");

const getRepliesController = async (req, res) => {
  const {commentID} = req.params;

  try {
    const replies = await Reply.find({comment: commentID})
      .populate("user", "username photo")
      .sort("-createdAt");
    return res.json({replies});
  } catch (error) {
    return res.status(422).json({error});
  }
};
module.exports = getRepliesController;
