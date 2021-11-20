const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {S_KEY} = require("../keys");

const loginRequired = (req, res, next) => {
  const {authorization} = req.headers;

  if (!authorization) {
    return res.status(401).json({error: "you must be logged in!"});
  }

  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, S_KEY, (err, result) => {
    if (err) {
      return res.status(401).json({error: "you must be logged in!"});
    }

    const {_id} = result;
    User.findById(_id).then((userData) => {
      if (!userData) {
        return res.status(401).json({error: "you must be logged in, again!"});
      }
      delete userData._doc.password;
      req.user = userData;
      next();
    });
  });
};

module.exports = loginRequired;
