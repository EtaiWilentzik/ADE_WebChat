const tokenService = require('../services/Token');

const Token = async (req, res) => {
  let result = await tokenService.Token(req.body.username, req.body.password);
  if (result==="not") {
    return res.status(404).send('Incorrect username and/or password');
  }
  res.send(result);
};

module.exports = {
  Token: Token
};
