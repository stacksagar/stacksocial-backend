const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.signup = async (req, res) => {
  const errors = validationResult(req).formatWith((er) => er.msg);

  const { name, username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);
  const newUser = new User({
    name,
    username,
    email,
    password: hashedPassword,
  });

  if (!errors.isEmpty()) {
    return res.send({ errors: errors.mapped(), results: null });
  }

  try {
    const NewUser = await newUser.save();
    await delete NewUser?._doc.password;
    return res.json({ errors: null, results: NewUser });
  } catch (error) {
    return res.send({ errors: error });
  }
};

exports.signin = async (req, res) => {
  const errors = validationResult(req).formatWith((er) => er.msg);

  const { email, password } = req.body;
  if (!errors.isEmpty()) {
    return res.send({ errors: errors.mapped(), results: null });
  }

  try {
    let user = await User.findOne({ email });
    await delete user?._doc.password;
    return res.json({ errors: null, results: user });
  } catch (error) {
    return res.json({ error, errors: errors.mapped(), results: null });
  }
};

exports.logout = async (req, res) => {};
