const {body} = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const signinValidator = [
  body("username")
    .notEmpty()
    .withMessage("required!")
    .custom(async (username) => {
      console.log("username", username);
      const user = await User.findOne({username});
      if (!user) {
        throw new Error("Invalid Username or Password!");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("required!")

    .custom(async (password, {req}) => {
      const user = await User.findOne({username: req.body.username});

      if (!user) {
        throw new Error("Invalid Username or Password!");
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new Error("Invalid Username or Password!");
      }

      return true;
    }),
];

module.exports = signinValidator;
