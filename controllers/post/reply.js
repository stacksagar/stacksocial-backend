const Comment = require("../../models/Comment");
const Reply = require("../../models/Reply");

const replyController = async (req, res) => {
  const {_id: commentID, text} = req.body;
  const userID = req.user._id;

  try {
    const newReply = await new Reply({
      body: text,
      comment: commentID,
      user: userID,
    }).save();

    await Comment.findByIdAndUpdate(commentID, {
      $push: {replies: newReply._id},
    });

    const newReplied = await Reply.findById(newReply._id).populate(
      "user",
      "username photo"
    );

    return res.json({reply: newReplied});
  } catch (error) {
    return res.status(422).json({error});
  }
};
module.exports = replyController;
