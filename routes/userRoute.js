const userRoute = require("express").Router();
const bcrypt = require("bcrypt");
const signupValidator = require("../validators/signupValidator");
const signinValidator = require("../validators/signinValidator");
const loginRequired = require("../middlewares/loginRequired");

const signupController = require("../controllers/signup");
const signinController = require("../controllers/signin");
const follow = require("../controllers/follow");
const unfollow = require("../controllers/unfollow");
const savePost = require("../controllers/savePost");

const User = require("../models/User");

userRoute.post("/signup", signupValidator, signupController);

userRoute.post("/signin", signinValidator, signinController);

userRoute.get("/protected", loginRequired, (req, res) => {
  res.status(200).json({message: "Access Granded!", user: req.user});
});

userRoute.get("/getinfo", loginRequired, (req, res) => {
  res.status(200).json({user: req.user});
});

userRoute.get("/:username", async (req, res) => {
  const {username} = req.params;

  User.findOne({username})
    .populate("savedPosts", "body likes dislikes comments postedBy thumbnail")
    .select("-password")
    .exec((error, user) => {
      if (error) {
        return res.status(422).json({error});
      }
      res.json({user});
    });
});

userRoute.put("/follow", loginRequired, follow);
userRoute.put("/unfollow", loginRequired, unfollow);
userRoute.put("/savePost", loginRequired, savePost);

userRoute.put("/update", loginRequired, (req, res) => {
  const {username, displayName, email, website, bio} = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {username, displayName, email, website, bio},
    },
    {new: true},
    (error, user) => {
      if (error) {
        return res.status(422).json({error});
      }

      res.json({user});
    }
  );
});

userRoute.put("/changePassword", loginRequired, async (req, res) => {
  const {oldPassword, newPassword} = req.body;
  try {
    const user = await User.findById(req.user._id);
    const match = await bcrypt.compare(oldPassword, user.password);

    if (!match) throw new Error("Invalid Password");
    const hashedPassword = await bcrypt.hash(newPassword, 8);
    User.findByIdAndUpdate(
      req.user._id,
      {$set: {password: hashedPassword}},
      {new: true},
      (error, doc, user) => {
        if (error) throw new Error(error);
        res.json({doc, user});
      }
    );
  } catch (err) {
    res.status(422).json({error: "" + err});
  }
});

userRoute.get("/search/:query", (req, res) => {
  const {query} = req.params;
  const searchPattern = new RegExp("^" + query);
  User.find({username: {$regex: searchPattern}})
    .then((result) => {
      return res.json({users: result});
    })
    .catch((error) => res.status(422).json({error}));
});

module.exports = userRoute;

/*We Hindus are in a lot of danger, our houses are being set on fire, please protect us*/
