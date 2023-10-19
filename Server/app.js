const express = require('express');
const http =require("http");
const { Server } = require("socket.io");
const bodyParser = require('body-parser');
const customEnv = require('custom-env');
const cors = require('cors');
const mongoose = require('mongoose');
const user = require('./routes/User');
const path = require('path');
const chat = require('./routes/Chat');
const token = require('./routes/Token');

customEnv.env(process.env.NODE_ENV, './config');

const app = express();

const server= http.createServer(app);

const io = new Server(server, {
    transports: ["websocket"],
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(cors());

console.log(process.env.CONNECTION_STRING);
console.log(process.env.PORT);


const connectToDatabase = async () => {
    mongoose.connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=> {
        console.log(`Connected to mongo ${process.env.CONNECTION_STRING}`)
    }).catch((err)=> {
        console.log("Error connecting to MongoDB:", err)
    });
};

try {
    connectToDatabase();
    app.use(express.static(path.join(__dirname, '../Client/build')));
    app.use('/api/Users', user);
    app.use('/api/Chats', chat);
    app.use('/api/Tokens', token);

    io.on("connection",(socket)=>{
        console.log(`User Connected: ${socket.id}`);

        socket.on("joinMyRoom", (username)=> {
            socket.join(username);
        })

        socket.on("chatDeleted", (chatId)=> {
            socket.to(chatId).emit("chatDeleted", chatId)
        })

        socket.on("joinChat", (data)=> {
            const { chatId, username, user} = data;
            socket.join(data.chatId);
            if (username && user) {
                io.to(username).emit("newChat", { id: chatId, user, lastMessage: null})
            }
        })
        socket.on("send_message",(data)=>{
            console.log("sending from the server")
            io.to(data.chatId).emit("receive_message",data);
        })
    })

    server.listen(process.env.PORT, ()=> {
        console.log(`server runing on port ${process.env.PORT}`)
    })
} catch (error) {
    console.error('Error while starting app:', error);
}


















































// const express = require('express');
// const user = require('./routes/User');
// const chat = require('./routes/Chat');
// const token = require('./routes/Token');
// const { Server } = require("socket.io");
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const customEnv = require('custom-env');
//
// const app = express();
// const http=require("http");
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
//
// app.use(cors());
//
// customEnv.env(process.env.NODE_ENV, './config');
// console.log(process.env.CONNECTION_STRING);
// console.log(process.env.PORT);
//
// app.use(express.static('public'));
// app.use('/api/Users', user);
// app.use('/api/Chats', chat);
// app.use('/api/Tokens', token);
//
// const server=http.createServer(app);
// const io = new Server(server, {
//     transports: ["websocket"],
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST"],
//     },
// });
//
// const mongoose = require('mongoose').default;
//
// const connectToDatabase = async () => {
//     try {
//         await mongoose.connect(process.env.CONNECTION_STRING, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log('Connected to MongoDB');
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error);
//     }
// };
//
// (async () => {
//     try {
//         await connectToDatabase();
//
//            io.on("connection",(socket)=>{
//               console.log(`User Connected: ${socket.id}`);
//             socket.on("send_message",(data)=>{
//                 console.log("sending from the server");
//                 socket.broadcast.emit("receive_message",data)
//             })
//        })
//         app.listen(process.env.PORT, () => {
//             console.log(`server listen on port ${process.env.PORT}`)
//         });
//            //server.listen(5001);
//
//     } catch (error) {
//         console.error('Failed to connect to the database:', error);
//     }
// })();
//
// module.exports = {
//     getKey: () => key
// };
// const express = require('express');
// const key = "AdiEtaiDaniel";
// const app = express();
// const http = require("http");
// const { Server } = require("socket.io");
// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:3000/",
//         methods: ["GET", "POST"],
//     },
// });
//
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
//
// const cors = require('cors');
// app.use(cors());
//
// const customEnv = require('custom-env');
// customEnv.env(process.env.NODE_ENV, './config');
// console.log(process.env.CONNECTION_STRING);
// console.log(process.env.PORT);
//
// const mongoose = require('mongoose').default;
//
// const connectToDatabase = async () => {
//     try {
//         await mongoose.connect(process.env.CONNECTION_STRING, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log('Connected to MongoDB');
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error);
//     }
// };
//
// (async () => {
//     try {
//         await connectToDatabase();
//         app.use(express.static('public'));
//         const user = require('./routes/User');
//         const chat = require('./routes/Chat');
//         const token = require('./routes/Token');
//         app.use('/api/Users', user);
//         app.use('/api/Chats', chat);
//         app.use('/api/Tokens', token);
//
//         io.on("connection", (socket) => {
//             console.log(`User Connected: ${socket.id}`);
//             socket.on("send_message", (data) => {
//                 console.log("sending from the server");
//                 socket.broadcast.emit("receive_message", data);
//             });
//         });
//
//         const port = process.env.PORT;
//         server.listen(port, () => {
//             console.log(`Server listening on port ${port}`);
//         });
//     } catch (error) {
//         console.error('Failed to connect to the database:', error);
//     }
// })();
//
// module.exports = {
//     getKey: () => key
// };
