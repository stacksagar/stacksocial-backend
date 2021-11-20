const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
// routes
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");

mongoose.connect(
  "mongodb+srv://thesagar:thesagar@cluster0.rp3jk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  () => {
    console.log("database connected");
  }
);

const middlewares = [
  express.json(),
  express.urlencoded({extended: true}),
  cors(),
];
app.use(middlewares);

app.use("/post", postRoute);
app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("running");
});
const port = process.env.PORT || 1000;
app.listen(port, () => {
  console.log(`server is running at ${1000}`);
});
