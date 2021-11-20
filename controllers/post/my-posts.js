const Post = require("../../models/Post");

const myPostsController = (req, res) => {
  const {postById} = req.params;
  Post.find({postedBy: postById})
    .populate("postedBy", "username photo")
    .exec()
    .then((posts) => res.status(200).json({posts}))
    .catch((error) => res.status(403).json(error));
};

module.exports = myPostsController;
