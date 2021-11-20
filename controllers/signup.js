const {validationResult} = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {S_KEY} = require("../keys");

module.exports = async (req, res) => {
  const errors = validationResult(req).formatWith((er) => er.msg);

  const {username, email, hashedPassword, photo} = req.body;

  const newUser = new User({
    username,
    email,
    photo,
    password: hashedPassword,
  });

  if (!errors.isEmpty()) {
    return res.json({errors: errors.mapped()});
  }

  try {
    const {_doc: user} = await newUser.save();
    user.password = undefined;
    const token = jwt.sign({_id: user._id}, S_KEY);
    return res.json({message: "successfully created!", token, user});
  } catch (error) {
    return res.json({error});
  }
};
