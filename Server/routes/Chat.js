const ControllerUser = require('../controllers/Chat');
const express = require('express');
const router = express.Router();

router.route('/').post(ControllerUser.addChat);
router.route('/').get(ControllerUser.getAllChats);
router.route('/:id/Messages').post(ControllerUser.addMessage);
router.route('/:id/Messages').get(ControllerUser.getMessages);
router.route('/:id').delete(ControllerUser.deleteChat);
router.route('/:id').get(ControllerUser.getChat);
module.exports = router;
