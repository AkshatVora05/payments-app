const express = require('express');
const { registerUserController, loginUserController } = require('../controller/authController');

const router = express.Router();

router.post('/signup', registerUserController);
router.post('/signin', loginUserController);

module.exports = router;