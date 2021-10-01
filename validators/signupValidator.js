const { body } = require("express-validator");
const User = require("../models/User");

const signupValidator = [
  body("name").notEmpty().withMessage("name is required!"),
  body("username")
    .notEmpty()
    .withMessage("username is required!")
    .custom(async (val) => {
      const user = await User.findOne({ username: val });
      if (user) {
        throw new Error("username already in used!");
      }
    }),
  body("email")
    .isEmail()
    .withMessage("please provide valid email address!")
    .custom(async (val) => {
      const user = await User.findOne({ email: val });
      if (user) {
        throw new Error("email already in used!");
      }
    }),
  body("password").notEmpty().withMessage("password is required!"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("confirm password is required!")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("password doesn't match!");
      }
      return true;
    }),
];

module.exports = signupValidator;
