const ControllerUser = require('../controllers/User');
const express = require('express');
const router = express.Router();

router.route('/').post(ControllerUser.createUser);
router.route('/:id').get(ControllerUser.getUser);


// router.route('/Tokens').post(ControllerUser.Token);
// router.route('/Chats').post(ControllerUser.addChat);

module.exports = router;
