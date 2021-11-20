const Post = require("../../models/Post");

const updateController = (req, res) => {
  const {_id, body} = req.body;
  body &&
    Post.findOneAndUpdate({_id}, {$set: {body}}, {new: true})
      .then((result) => {
        return res.json({result});
      })
      .catch((error) => {
        return res.json({error});
      });
};

module.exports = updateController;
