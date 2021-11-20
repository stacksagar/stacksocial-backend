// middlewares && validators
const newPostValidator = require("../validators/newPostValidator");
const loginRequired = require("../middlewares/loginRequired");

// controllers
const newPostController = require("../controllers/post/newPost");
const likeController = require("../controllers/post/like");
const dislikeController = require("../controllers/post/dislike");
const updateController = require("../controllers/post/update");
const myPostsController = require("../controllers/post/my-posts");
const getAllController = require("../controllers/post/getAll");
const deleteController = require("../controllers/post/delete");
const commentController = require("../controllers/post/comment");
const replyController = require("../controllers/post/reply");
const getCommentsController = require("../controllers/post/getComments");
const getRepliesController = require("../controllers/post/getReplies");

const postRoute = require("express").Router();

postRoute.post("/new", newPostValidator, loginRequired, newPostController);

postRoute.delete("/delete", deleteController);

postRoute.get("/all", getAllController);

postRoute.get("/userPosts/:postById", myPostsController);

postRoute.put("/update", updateController);

postRoute.put("/like", loginRequired, likeController);

postRoute.put("/dislike", loginRequired, dislikeController);

postRoute.put("/comment", loginRequired, commentController);
postRoute.put("/reply", loginRequired, replyController);

postRoute.get("/comments/:postID", getCommentsController);

postRoute.get("/replies/:commentID", getRepliesController);

module.exports = postRoute;
