const ControllerUser = require('../controllers/Token');
const express = require('express');
const router = express.Router();

router.route('/').post(ControllerUser.Token);

module.exports = router;
