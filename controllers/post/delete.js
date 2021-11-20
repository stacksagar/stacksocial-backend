const Post = require("../../models/Post");

const deleteController = (req, res) => {
  const {_id} = req.body;
  if (_id) {
    Post.findOneAndDelete({_id})
      .then((result) => {
        return res.json({result});
      })
      .catch((error) => {
        return res.json({error});
      });
  }
};

module.exports = deleteController;
