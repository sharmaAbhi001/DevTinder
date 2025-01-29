const express = require("express");
const {marvelHeroSignupHandler,marvelHeroLoginHandler,marvelHeroLogoutHandler} = require("../controllers/authController")
const router = express.Router();


router.post("/signup", marvelHeroSignupHandler);
router.post("/login",marvelHeroLoginHandler);
router.post("/logout",marvelHeroLogoutHandler);


module.exports = router;