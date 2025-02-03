// here user get data who send him friend request means intrested and show they with whome they are in with connection

const express = require("express");
const {showPendingRequestHandler,showAllConnectionHandler,feedApiHandler} =require("../controllers/userController");

//api/v1/user/connection/pending/request

const userRouter = express.Router();


userRouter.get("/request/received",showPendingRequestHandler);
userRouter.get("/connections",showAllConnectionHandler)
userRouter.get("/feed",feedApiHandler);


module.exports = userRouter;