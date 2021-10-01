const { body } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const signupValidator = [
  body("email")
    .isEmail()
    .withMessage("please provide valid email address!")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("user not found!");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required!")

    .custom(async (password, { req }) => {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return true;
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new Error("password doesn't match!");
      }

      return true;
    }),
];

module.exports = signupValidator;
