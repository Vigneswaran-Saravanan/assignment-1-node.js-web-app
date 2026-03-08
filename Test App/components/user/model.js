import mongoose from "mongoose";
import { scryptSync } from "crypto";

const UserSchema = new mongoose.Schema({
  user: String,
  password: String
});
const User = mongoose.model("User", UserSchema);

//Function to authenticate a user and pwd. 
//Returns true if match found. Returns false if no match.
async function authenticateUser(username, pw) {
  let key = scryptSync(pw, process.env.SALT, 64);
  let result = await User.findOne({
    user: String(username),
    password: key.toString("base64")
  });
  return (result) ? true : false;
}
async function getUser(username) {
  let result = await User.findOne({ user: username });
  return (result) ? result : false;
}
async function addUser(username, pw) {
  let user = await getUser(username);
  console.log(`User exists: $user`);
  if (!user) {
    let key = scryptSync(pw, process.env.SALT, 64);
    let newUser = new User({
      user: String(username),
      password: key.toString("base64")
    });
    let result = await newUser.save();
    return (result === newUser) ? true : false;
  } else {
    return false;
  }
}

export default {
  authenticateUser,
  getUser,
  addUser
};