require('dotenv').config();
const dotenv = require('dotenv');
const cors = require("cors");
const express = require('express');
const connectToDB = require("./config/database");
const authRouter = require("./routes/authRoute");
const profileRouter = require("./routes/profileRoute")
const bodyParser    = require('body-parser');
const cookieParser = require("cookie-parser");
const checkForAuthenticationCookie = require("./middleware/authorization");
const connectionRouter = require('./routes/connectionRequest');
const userRouter = require('./routes/user');
const http = require("http");
const initializeSocket = require('./controllers/socket');
const chatRouter = require('./routes/chat');


const app = express()
const PORT = process.env.PORT|| 3000;

const server = http.createServer(app);
initializeSocket(server);

 
const option = {
    // origin:"http://localhost:5173",
    origin:"https://connectkaro-alpha.vercel.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,

}






// parshar
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(cors(option));


 
// Marvel ka routing system 
app.use("/api/v1",authRouter);
app.use("/api/v1/",checkForAuthenticationCookie("token"),profileRouter);
app.use("/api/v1",checkForAuthenticationCookie("token"),connectionRouter);
app.use("/api/v1/user",checkForAuthenticationCookie("token"),userRouter);
app.use("/api/v1/",checkForAuthenticationCookie("token"),chatRouter);


connectToDB()
.then(()=>{
    console.log("Database Connection established !");
    server.listen(PORT,()=> console.log(`server start port ${PORT}`))
})
.catch((err)=>{
    console.log(err);
    (err)
    console.error("Database cannot be connected!");
});

