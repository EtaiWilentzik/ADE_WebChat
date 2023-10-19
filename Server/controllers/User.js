const userService = require('../services/User');
const jwt = require("jsonwebtoken");
const createUser = async (req, res) => {
  const { username, password, displayName, profilePic } = req.body;
  const result = await userService.createUser(username, password, displayName, profilePic);
  if (result.error) {
    return res.status(409).json({});
  }
  return res.json(result);
};

const getUser = async (req, res) => {
 // console.log("I am going to get a user");
 // console.log(req.params.id);
  const username = isLoggedIn(req);
  //console.log("I am here:");
  if (username) {
    if (username !== req.params.id) {
       return res.status(401).send("Unautorized");
    //  console.log("The username is");
    }
    res.json(await userService.getUser(username));
   // console.log("The response from the function is");
   // console.log(userService.getUser(username));
    return;
   // console.log("I am here:");
  } else {
    res.status(401).send("Not logged in");
  //  console.log("I am here3");
  }
};

const isLoggedIn = (req) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    //console.log("The token is" + token);
    try {
      const data = jwt.verify(token, process.env.KEY);
      //console.log(data);
      //console.log('The logged in user is: ' + data);
      return data;
    } catch (err) {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = {
  createUser: createUser,
  getUser: getUser,
  isLoggedIn: isLoggedIn
};
