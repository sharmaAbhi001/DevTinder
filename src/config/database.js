require('dotenv').config();
const dotenv = require('dotenv')
const mongoose = require('mongoose');


const  connectToDB = async () => {
    await mongoose.connect(process.env.Mongo_URL);
};



module.exports = connectToDB;