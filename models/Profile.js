//* User, Title, Bio,  ProfilePic, Links, Posts, Bookmarks
const { Schema, model } = require('mongoose'); 
const User = require('./User');

const profileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, maxLength: 30, required: true, trim: true },
    title: { type: String, trim: true, maxLength: 100 },
    bio: { type: String, trim: true, maxLength: 500 },
    profilePic: String,
    links: {
      website: String,
      facebook: String,
      twitter: String,
      github: String,
    },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Posts' }],
    bookmarks: [{ type: Schema.Types.ObjectId, ref: 'Posts' }],
  },
  {
    timestamps: true,
  }
);

const Profile = model('Profile', profileSchema);

module.exports = Profile;