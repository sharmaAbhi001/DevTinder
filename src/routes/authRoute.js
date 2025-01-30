const express = require("express");
const {marvelHeroSignupHandler,marvelHeroLoginHandler,marvelHeroLogoutHandler,marvelHeroPasswordFrogetrequest,marvelHeroPasswordReset} = require("../controllers/authController")
const router = express.Router();


router.post("/signup", marvelHeroSignupHandler);
router.post("/login",marvelHeroLoginHandler);
router.post("/logout",marvelHeroLogoutHandler);
router.post("/forget-password",marvelHeroPasswordFrogetrequest)
router.post("/password-reset/:token",marvelHeroPasswordReset)


module.exports = router;