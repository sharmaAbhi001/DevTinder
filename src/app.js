require('dotenv').config();
const dotenv = require('dotenv')
const express = require('express');
const connectToDB = require("./config/database");
const userRouter = require("./routes/user");
const bodyParser    = require('body-parser');

const app = express()
const PORT = 3000;



// parshar
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Marvel ka routing system 
app.use("/user",userRouter);


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



