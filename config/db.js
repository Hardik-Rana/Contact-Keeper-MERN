const mongoose = require('mongoose');
const config = require('config');
const dotenv = require('dotenv');
dotenv.config();
const db = process.env.mongoURI

const connectDB = async () =>{
    
    try {
        await mongoose.connect(db);
        console.log('MongoDB Connected');

    } catch (err) {
        
        console.error(err.message);
        process.exit(1);
    }


};

module.exports= connectDB;


