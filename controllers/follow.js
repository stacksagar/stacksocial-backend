const User = require("../models/User");

module.exports = (req, res) => {
  const {followID} = req.body;
  const {_id: userID} = req.user;

  User.findByIdAndUpdate(
    followID,
    {$push: {followers: userID}},
    {new: true},
    (error, doc, followUser) => {
      if (error) {
        return res.status(422).json({error});
      }
      User.findByIdAndUpdate(
        userID,
        {$push: {following: followID}},
        {new: true},
        (error2, doc2, followingUser) => {
          if (error2) {
            return res.status(422).json({error2});
          }
          res.json({doc, doc2, followUser, followingUser});
        }
      );
    }
  );
};
