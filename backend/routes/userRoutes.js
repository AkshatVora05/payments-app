const express = require('express');
const { updateUserController, getUsersController, profileController } = require('../controller/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.put('/update', authMiddleware, updateUserController);
router.get('/profile', authMiddleware, profileController);
router.get('/getUsers', authMiddleware, getUsersController);

module.exports = router;