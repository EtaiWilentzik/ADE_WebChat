const mongoose = require('mongoose');
mongoose.pluralize(null); // Disable pluralization of collection names

const Schema = mongoose.Schema;

const UserPassNameSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  displayName: {
    type: String,
  },
  profilePic: {
    type: String,
  }
});

const UserPassSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  }
});

const UserSchema = new Schema({
  username: {
    type: String,
  },
  displayName: {
    type: String,
  },
  profilePic: {
    type: String,
  }
});

const UserPassName = mongoose.model('UserPassName', UserPassNameSchema);
const UserPass = mongoose.model('UserPass', UserPassSchema);
const User = mongoose.model('User', UserSchema);

module.exports = {
  UserPassName: UserPassName,
  UserPass: UserPass,
  User: User
};
