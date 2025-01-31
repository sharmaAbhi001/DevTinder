const express = require("express");
const { ignoreOrIntrestedHandler } = require("../controllers/connectionController");



const  connectionRouter = express.Router();


connectionRouter.post("/request/send/:status/:toUserId",ignoreOrIntrestedHandler);



module.exports = connectionRouter;