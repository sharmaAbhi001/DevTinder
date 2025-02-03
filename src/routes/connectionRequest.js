const express = require("express");
const { ignoreOrIntrestedHandler,acceptedOrRejectedReviewHandler } = require("../controllers/connectionController");



const  connectionRouter = express.Router();


connectionRouter.post("/request/send/:status/:toUserId",ignoreOrIntrestedHandler);
connectionRouter.post("/request/review/:status/:requestId",acceptedOrRejectedReviewHandler);



module.exports = connectionRouter;