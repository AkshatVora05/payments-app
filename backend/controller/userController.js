const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const { updateUserZod, getUsersZod } = require("../zod/userZod");

const updateUserController = async (req, res) => {
    try{
        const {newPassword, newFirstname, newLastname} = req.body;

        if(!newPassword && !newFirstname && !newLastname){
            return res.status(400).json({
                success: false,
                message: "Atleast one field is required to be updated"
            })
        }

        const check = updateUserZod.safeParse({
            newPassword,
            newFirstname,
            newLastname
        });

        if(!check.success){
            return res.status(400).json({
                success: false,
                message: "Invalid input fields"
            })
        }

        const { userId } = req.user;

        const updatedFields = {};

        if(newPassword){
            const salt = await bcrypt.genSalt(10);
            const newHashedPassword = await bcrypt.hash(newPassword, salt);
            updatedFields.password = newHashedPassword
        }

        if(newFirstname){
            updatedFields.firstname = newFirstname;
        }

        if(newLastname){
            updatedFields.lastname = newLastname;
        }

        await User.findByIdAndUpdate(
            userId,
            { '$set': updatedFields},
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "User details updated successfully"
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "An error occured in update user details api"
        })
    }
}

const getUsersController = async (req, res) => {
    try{
        const filter = req.query.filter || "";

        const check = getUsersZod.safeParse(filter);

        if(!check.success){
            return res.status(400).json({
                success: false,
                message: "Invalid input fields"
            })
        }

        const users = await User.find({
            _id: {
                '$ne': req.user.userId  
            },
            '$or': [{
                firstname: {
                    '$regex': filter
                }
            }, {
                lastname: {
                    '$regex': filter
                }
            }]
        });

        res.status(200).json({
            user: users.map(user => ({
                _id: user._id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname
            }))
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "An error occured in get users api"
        })
    }
}

const profileController = async (req, res) => {
    try{
        const { userId, username, firstname, lastname } = req.user;
        
        res.status(200).json({
            success: true,
            message: "User data fetched successfully",
            user: {
                userId,
                username,
                firstname,
                lastname
            }
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "An error occured in getUserDetails api"
        })
    }
}

module.exports = {
    updateUserController,
    getUsersController,
    profileController
}