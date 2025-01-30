require('dotenv').config();
const dotenv = require('dotenv')
const express = require('express');
const connectToDB = require("./config/database");
const authRouter = require("./routes/authRoute");
const profileRouter = require("./routes/profileRoute")
const bodyParser    = require('body-parser');
const cookieParser = require("cookie-parser");
const checkForAuthenticationCookie = require("./middleware/authorization")


const app = express()
const PORT = 3000;



// parshar
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

// Marvel ka routing system 
app.use("/",authRouter);

app.use("/user",checkForAuthenticationCookie("token"),profileRouter)


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



