const express = require("express");
const {marvelHeroSignupHandler} = require("../controllers/user")
const router = express.Router();


router.post("/signup", marvelHeroSignupHandler)


module.exports = router;