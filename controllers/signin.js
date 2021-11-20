const {validationResult} = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {S_KEY} = require("../keys");

module.exports = async (req, res) => {
  const errors = validationResult(req).formatWith((er) => er.msg);

  const {username} = req.body;

  if (!errors.isEmpty()) {
    const error = Object.values(errors.mapped())[0];
    return res.json({error});
  }

  try {
    const {_doc: user} = await User.findOne({username});
    user.password = undefined;
    const token = jwt.sign({_id: user._id}, S_KEY);
    return res.json({message: "successfully signin!", token, user});
  } catch (error) {
    return res.json({error: "something wrong!"});
  }
};
