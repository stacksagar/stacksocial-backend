const express = require("express");
const app = express();
const authRoute = require("./routes/authRoute");
const mongoose = require("mongoose");
const cors = require("cors");

const middlewares = [
  express.json(),
  express.urlencoded({ extended: true }),
  cors(),
];
app.use(middlewares);

app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.json({
    message: "work",
  });
});

mongoose.connect("mongodb://localhost:27017/stack-blog", () => {
  console.log("database connected");
});

app.listen(1000, () => {
  console.log(`server is running at ${1000}`);
});
