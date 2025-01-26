const express = require("express");
const {marvelHeroSignupHandler,marvelOneHeroFindHandler,modifyMarvelHero,marvelHeroLoginHandler} = require("../controllers/user")
const router = express.Router();


router.post("/signup", marvelHeroSignupHandler)
router.get("/allhero",marvelOneHeroFindHandler)
router.patch("/modify",modifyMarvelHero);
router.post("/login",marvelHeroLoginHandler);


module.exports = router;