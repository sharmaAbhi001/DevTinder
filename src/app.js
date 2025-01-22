require('dotenv').config();
const dotenv = require('dotenv')
const express = require('express');
const connectToDB = require("./config/database")

const app = express()
const PORT = 3000;






connectToDB()
.then(()=>{
    console.log("Database Connection established !");
    app.listen(PORT,()=> console.log(`server start port ${PORT}`))
})
.catch((err)=>{
    console.log(err);
    (err)
    console.error("Database cannot be connected!");
})



