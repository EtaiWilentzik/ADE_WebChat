const UserPass = require('../models/User').UserPass;
const jwt = require('jsonwebtoken');

const Token = async (username, password) => {
    try {
        console.log("we are in the login function");
        const existingUser = await UserPass.findOne({ username: username, password: password });

        if (existingUser) {
            console.log(existingUser);
            const data = username;
            const token = jwt.sign(data, process.env.KEY);
           // console.log("the token is");
           // console.log(token);
            return token;
        } else {
            const error = "Error creating user";
            const message = "Invalid username or password";
            console.error(error, message);
           return "not";
        }
    } catch (error) {
      return "not"
    }
};


module.exports = {
    Token: Token
};
