const Post = require("../../models/Post");

const dislikeController = async (req, res) => {
  const {_id: postID} = req.body;
  const {_id: userID} = req.user;

  try {
    const {dislikes} = await Post.findById(postID);

    if (dislikes.indexOf(userID) > -1) {
      Post.findByIdAndUpdate(
        postID,
        {$pull: {dislikes: userID}},
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
        {$push: {dislikes: userID}, $pull: {likes: userID}},
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
module.exports = dislikeController;
