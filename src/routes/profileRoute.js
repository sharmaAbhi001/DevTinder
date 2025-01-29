const express = require("express");
const {profileViewHnadler} = require("../controllers/profileController");
const checkForAuthenticationCookie = require("../middleware/authorization");


profileRouter = express.Router();

profileRouter.get("/profile/view",checkForAuthenticationCookie("token"),profileViewHnadler);



module.exports = profileRouter;
