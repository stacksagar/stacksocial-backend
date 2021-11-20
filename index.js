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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running at ${3000}`);
});
