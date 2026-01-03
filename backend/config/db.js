const mongoose = require('mongoose');

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
    }
    catch(err){
        console.log("Error connecting database");
    }
}

module.exports = connectDb;