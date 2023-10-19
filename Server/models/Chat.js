const mongoose = require('mongoose');
const { User } = require("./User");

mongoose.pluralize(null); // Disable pluralization of collection names

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  // _id: {
  //     type: Number,
  // },
  created: {
    type: String,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: User,
  },
  content: {
    type: String,
    default: null,
  },
});

const ChatSchema = new Schema({
  // _id: {
  //     type: Number,
  // },
  users: [{
    type: Schema.Types.ObjectId,
    ref: User,
  }],
  messages: [{
    type: Schema.Types.ObjectId,
    ref: MessageSchema,
  }],
});

const Message = mongoose.model('Message', MessageSchema);
const Chat = mongoose.model('Chat', ChatSchema);

module.exports = {
  Message: Message,
  Chat: Chat
};
