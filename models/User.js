//* Name, Email, Password, Profile
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      required: true,
      trim: true,
      type: String,
    },
    username: {
      required: true,
      trim: true,
      maxLength: 15,
      type: String,
    },
    email: {
      required: true,
      trim: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
    picture: {
      type: String,
      default: "https://example.com/sofjasler.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
module.exports = User;
