const express = require("express");
const {profileViewHnadler, profileEditHandler} = require("../controllers/profileController");
const checkForAuthenticationCookie = require("../middleware/authorization");
const {validateMarvelHeroUpdate} = require("../utils/validation")



profileRouter = express.Router();

profileRouter.get("/profile/view",profileViewHnadler);
profileRouter.patch("/profile/update", validateMarvelHeroUpdate,profileEditHandler)



module.exports = profileRouter;
