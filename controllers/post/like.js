const Post = require("../../models/Post");
const likeController = async (req, res) => {
  const {_id: postID} = req.body;
  const {_id: userID} = req.user;
  try {
    const {likes} = await Post.findById(postID);

    if (likes.indexOf(userID) > -1) {
      Post.findByIdAndUpdate(
        postID,
        {$pull: {likes: userID}},
        {new: true}
      ).exec((error, result) => {
        if (error) {
          return res.status(422).json({error});
        }

        return res.json({result});
      });
    } else {
      Post.findByIdAndUpdate(
        postID,
        {$push: {likes: userID}, $pull: {dislikes: userID}},
        {new: true}
      ).exec((error, result) => {
        if (error) {
          return res.status(422).json({error});
        }
        return res.json({result});
      });
    }
  } catch (error) {
    return res.send("fail");
  }
};
module.exports = likeController;
