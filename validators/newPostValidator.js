const {body} = require("express-validator");

const newPostValidator = [
  body("body").notEmpty().withMessage("body is required!"),
];

module.exports = newPostValidator;
