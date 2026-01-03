const dotenv = require('dotenv');
dotenv.config({path: './.env'});

const express = require('express');
const connectDb = require('./config/db');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const accountRoutes = require('./routes/accountRoutes');

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/account', accountRoutes);

const startServer = async () => {
    try{
        await connectDb();
        app.listen(process.env.PORT, () => {
            console.log(`The server is running on ${process.env.PORT}`)
        })
    }
    catch(err){
        console.log("Failed to start the server: ", err);
        process.exit(1);
    }
}

startServer();