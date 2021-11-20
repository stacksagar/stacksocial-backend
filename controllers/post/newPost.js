const {validationResult} = require("express-validator");
const Post = require("../../models/Post");

module.exports = (req, res) => {
  const errors = validationResult(req).formatWith((er) => er.msg);

  if (!errors.isEmpty()) {
    return res.status(406).json({errors: errors.mapped()});
  }

  const {body, thumbnail} = req.body;

  req.user.password = undefined;
  const post = new Post({
    body,
    thumbnail,
    postedBy: req.user,
  });

  post
    .save()
    .then((post) => {
      res.status(200).json({post});
    })
    .catch((error) => {
      return res.status(406).json({error});
    });
};
