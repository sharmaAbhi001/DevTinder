const express = require("express");
const {profileViewHnadler, profileEditHandler,profilePasswordUpdateHandler} = require("../controllers/profileController");
const {validateMarvelHeroUpdate} = require("../utils/validation")



profileRouter = express.Router();

profileRouter.get("/profile/view",profileViewHnadler);
profileRouter.patch("/profile/update", validateMarvelHeroUpdate,profileEditHandler);
profileRouter.patch("/profile/update/password",profilePasswordUpdateHandler);



module.exports = profileRouter;
