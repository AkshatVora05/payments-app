const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getBalanceController, transferController } = require('../controller/accountController');

const router = express.Router();

router.get('/balance', authMiddleware, getBalanceController);

router.post('/transfer', authMiddleware, transferController);

module.exports = router;