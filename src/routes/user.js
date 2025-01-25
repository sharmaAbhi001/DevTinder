const express = require("express");
const {marvelHeroSignupHandler,marvelOneHeroFindHandler} = require("../controllers/user")
const router = express.Router();


router.post("/signup", marvelHeroSignupHandler)
router.get("/allhero",marvelOneHeroFindHandler)


module.exports = router;