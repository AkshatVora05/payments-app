const mongoose = require('mongoose');
const Account = require("../models/accountModel");
const { transferZod } = require('../zod/transactionZod');

const getBalanceController = async (req, res) => {
    try{
        const userId = req.user.userId;

        const account = await Account.findOne({
            userId
        });

        if(!account){
            return res.status(404).json({
                success: false,
                message: "Account not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Account balance fetched successfully",
            balance: account.balance
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "An error occured in get balance api"
        })
    }
}

const transferController = async (req, res) => {
    let session;
    try{
        session = await mongoose.startSession();

        session.startTransaction();

        const { to, amount } = req.body;
        const { userId } = req.user;

        const check = transferZod.safeParse({
            to,
            amount
        });

        if(!check.success){
            return res.status(400).json({
                success: false,
                message: "Invalid input fields"
            })
        }

        if(userId.toString() === to){
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: "Sender and receiver cannot be the same"
            })
        }

        const account = await Account.findOne({
            userId
        }).session(session);

        if(!account){
            await session.abortTransaction();
            return res.status(404).json({
                success: false,
                message: "Sender account not found"
            });
        }

        if(account.balance < amount){
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: "Insufficient balance"
            });
        }

        const toAccount = await Account.findOne({
            userId: to
        }).session(session);

        if(!toAccount){
            await session.abortTransaction();
            return res.status(404).json({
                success: false,
                message: "Receiver account not found"
            });
        }

        await Account.updateOne({
            userId
        }, {
            '$inc': {
                balance: -amount
            }
        }).session(session);

        await Account.updateOne({
            userId: to
        }, {
            '$inc': {
                balance: amount
            }
        }).session(session);

        await session.commitTransaction();

        res.status(200).json({
            success: true,
            message: "Transaction successful"
        });
    }
    catch(err){
        if(session) await session.abortTransaction();
        res.status(500).json({
            success: false,
            message: "An error occured in transfer api"
        })
    }
    finally{
        if(session){
            session.endSession();
        }
    }
}

module.exports = {
    getBalanceController,
    transferController
}