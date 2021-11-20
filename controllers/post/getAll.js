const Post = require("../../models/Post");

const getAllController = (req, res) => {
  Post.find()
    .populate("postedBy", "username photo")
    .sort("-createdAt")
    .exec()
    .then((posts) => res.status(200).json({posts}))
    .catch((error) => res.status(403).json(error));
};

module.exports = getAllController;
