const Account = require("../models/accountModel");
const User = require("../models/userModel");
const { registerZod, loginZod } = require("../zod/authZod");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUserController = async (req, res) => {
    try{
        const {username, password, firstname, lastname} = req.body;

        if(!username || !password || !firstname || !lastname){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const checkFields = registerZod.safeParse({
            username,
            password,
            firstname,
            lastname
        });

        if(!checkFields.success){
            return res.status(400).json({
                success: false,
                message: "Input fields are invalid"
            })
        }

        const user = await User.findOne({
            username
        })

        if(user){
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            password: hashedPassword,
            firstname,
            lastname
        })

        await Account.create({
            userId: newUser._id,
            balance: 1 + (Math.random() * 10000)
        })

        res.status(201).json({
            success: true,
            message: "New user created successfully"
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "An error occured in signup api"
        })
    }
}

const loginUserController = async (req, res) => {
    try{
        const { username, password } = req.body

        if(!username || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const checkFields = loginZod.safeParse({
            username,
            password
        });

        if(!checkFields.success){
            return res.status(400).json({
                success: false,
                message: "Invalid input fields"
            })
        }

        const user = await User.findOne({
            username
        });

        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid username"
            })
        }

        const compare = await bcrypt.compare(password, user.password);

        if(!compare){
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            })
        }

        const secret = process.env.JWT_SECRET;
        const token = jwt.sign({
            userId: user._id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname
        }, 
        secret, {
            expiresIn: '4h'
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            token
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "An error occured in signin api"
        })
    }
    
}

module.exports = {
    registerUserController,
    loginUserController
}