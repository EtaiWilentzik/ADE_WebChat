const Chat = require('../models/Chat').Chat;
const Message = require('../models/Chat').Message;
const User = require('../models/User').User;

/*const getLastMessage = async (id) => {
  const chat = await Chat.findOne({ _id: id });
  const msgList = chat.messages;

  if (msgList.length === 0) {
    return null;
  }

  let minTimeString = "";
  let minMessage = "";

  for (const msg of msgList) {
    const tmpMsg = await Message.findOne({ _id: msg._id });

    if (minMessage === "") {
      minMessage = tmpMsg.content;
      minTimeString = tmpMsg.created.toISOString();
    } else {
      const tmpTime = tmpMsg.created.toISOString();
      const minTime = new Date(minTimeString);

      if (minTime > tmpTime) {
        minTimeString = tmpTime;
        minMessage = tmpMsg.content;
      }
    }
  }

  return minMessage;
};*/

const getAllChats = async (username) => {
  try {
    const myUser = await User.findOne({ username });
    const id = myUser._id;
    const chats = await Chat.find({});

    const takesPartIn = [];

    for (const chat of chats) {
      const user1 = chat.users[0]._id;
      const user2 = chat.users[1]._id;

      if (user1.toString() === id.toString() || user2.toString() === id.toString()) {
        let friend;

        if (user1.equals(id)) {
          friend = await User.findOne({ _id: user2 });
        } else {
          friend = await User.findOne({ _id: user1 });
        }

        const len = chat.messages.length;

        if (len === 0) {
          takesPartIn.push({
            id: chat._id,
            user: {
              username: friend.username,
              displayName: friend.displayName,
              profilePic: friend.profilePic
            },
            lastMessage: null
          });
        } else {
          const lastMsgId = chat.messages[len - 1];
          const lastMsg = await Message.findOne({ _id: lastMsgId });

          takesPartIn.push({
            id: chat._id,
            user: {
              username: friend.username,
              displayName: friend.displayName,
              profilePic: friend.profilePic
            },
            lastMessage: {
              id: lastMsg._id,
              created: lastMsg.created,
              content: lastMsg.content
            }
          });
        }
      }
    }

    return takesPartIn;
  } catch (error) {

return "not"
  }
};


const addMessage = async (username, chatId, msg) => {
  try {
    const myUser = await User.findOne({ username });
    const now = new Date();
    const dateString = now.toISOString();

    const newMessage = new Message({ created: dateString, sender: myUser._id, content: msg });
    await newMessage.save();

    const chat = await Chat.findOne({ _id: chatId });
    chat.messages.push(newMessage._id);
    await chat.save();

    const to_return = {
      id: newMessage._id,
      created: newMessage.created,
      sender: {
        username: myUser.username,
        displayName: myUser.displayName,
        profilePic: myUser.profilePic
      },
      content: newMessage.content
    };

    return to_return;
  } catch (error) {
    // Handle the error here
  return "not"
  }
};


const addChat = async (username, myUsername) => {
  try {
    const existingUser = await User.findOne({ username });
    const myUser = await User.findOne({ username: myUsername });

    if (!existingUser) {
      return "not"
    }

    const newUser = new User({
      username: existingUser.username,
      displayName: existingUser.displayName,
      profilePic: existingUser.profilePic
    });

    const newChat = new Chat({ users: [existingUser._id, myUser._id], messages: [] });
    await newChat.save();

    const to_return = {
      id: newChat._id,
      user: {
        username: existingUser.username,
        displayName: existingUser.displayName,
        profilePic: existingUser.profilePic
      }
    };

    return to_return;
  } catch (error) {
 return "not"

  }
};


const getChat = async (chatId, myUserName) => {
  try {
    const chat = await Chat.findOne({ _id: chatId });
    if (!chat) {
      return "not";
    } else {
      const u1 = chat.users[0];
      const u2 = chat.users[1];

      const myUser = await User.findOne({ username: myUserName });
       //console.log("u1 is " + u1.toString() + " muUser is " + myUser._id.toString());
      if (
          myUser._id.toString() !== u1.toString() &&
          myUser._id.toString() !== u2.toString()
      ) {
        //console.log("not in the chat");
        return "not";
      }
    }

    const user1 = chat.users[0];
    const user2 = chat.users[1];
    const user1Data = await User.findOne({ _id: user1 });
    const user2Data = await User.findOne({ _id: user2 });
    const Messages = [];
    const MessageDB = await Message.find({});

    for (const msg of chat.messages) {
      try {
        const message = await Message.findOne({ _id: msg._id });
        const sender = await User.findOne({ _id: message.sender });
        Messages.push({
          id: message._id,
          created: message.created,
          sender: {
            username: sender.username,
            displayName: sender.displayName,
            profilePic: sender.profilePic,
          },
          content: message.content,
        });
      } catch (error) {
       return "not"
      }
    }

    const users = [
      {
        username: user1Data.username,
        displayName: user1Data.displayName,
        profilePic: user1Data.profilePic,
      },
      {
        username: user2Data.username,
        displayName: user2Data.displayName,
        profilePic: user2Data.profilePic,
      },
    ];
    const to_return = {
      id: chatId,
      users: users,
      messages: Messages,
    };
    /*console.log(to_return);*/
    return to_return;
  } catch (error) {
    // Handle error when finding chat or users
    return "not"
  }
};


const deleteChat = async (id) => {
/*
  console.log("avi");
*/
  try {
    const result = await Chat.deleteOne({ "_id": id });
    if (result.deletedCount === 0) {
      // Handle the case when no document was deleted
      return "no delete occurred";
    }
    return "not";
  } catch (error) {
    return "not";
  }
};




const getMessages = async (chatId) => {
        const chat = await Chat.findOne({ _id: chatId });
    
 
   
      const Messages = [];
 
    
      for (const msg of chat.messages) {
        const message = await Message.findOne({ _id: msg._id });
        const sender = await User.findOne({ _id: message.sender });
        Messages.push({
          "id": message._id,
          "created": message.created,
          "sender": {
            "username": sender.username
          },
          "content": message.content
        });
      }
    
    return Messages;
};

module.exports = {
  getAllChats: getAllChats,
  addChat: addChat,
  addMessage: addMessage,
  getChat: getChat,
  deleteChat: deleteChat,
  getMessages: getMessages
};

