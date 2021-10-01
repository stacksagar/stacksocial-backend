const { signup, signin } = require("../controllers/authController");
const { body } = require("express-validator");

const authRoute = require("express").Router();
const signupValidator = require("../validators/signupValidator");
const signinValidator = require("../validators/signinValidator");

authRoute.post("/signup", signupValidator, signup);
authRoute.post("/signin", signinValidator, signin);

module.exports = authRoute;
