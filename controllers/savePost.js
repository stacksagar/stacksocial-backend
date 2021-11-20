const User = require("../models/User");
module.exports = (req, res) => {
  const {postID} = req.body;
  const user = req.user;

  if (user.savedPosts.includes(postID)) {
    User.findByIdAndUpdate(
      user._id,
      {$pull: {savedPosts: postID}},
      {new: true},
      (error, doc, result) => {
        if (error) {
          return res.status(422).json({error});
        }

        return res.json({doc, user: result});
      }
    );
  } else {
    User.findByIdAndUpdate(
      user._id,
      {$push: {savedPosts: postID}},
      {new: true},
      (error, doc, result) => {
        if (error) {
          return res.status(422).json({error});
        }

        res.json({doc, user: result});
      }
    );
  }
};
