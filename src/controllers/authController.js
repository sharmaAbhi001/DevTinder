const User = require("../models/user");
const bcrypt = require("bcrypt");
const {
  validateMarvelHeroSignup,
  validateMarvelHeroLogin,
} = require("../utils/validation");
const { createTokenForUser } = require("../services/userauth");

// sighnup
const marvelHeroSignupHandler = async (req, res) => {
  try {
    // validation of data
    validateMarvelHeroSignup(req);

    const UserDetails = req.body;

    const user = new User({
      firstName: UserDetails.firstName,
      lastName: UserDetails.lastName,
      emailId: UserDetails.emailId,
      password: UserDetails.password,
      age: UserDetails.age,
      gender: UserDetails.gender,
      skills: UserDetails.skills,
    });

    // incrypt data before save by pre method
    await user.save();
    // jwt token create and valid
    res.send("User Created Successfully!");
  } catch (error) {
    res.send(error.message);
  }
};


// login marvel hero
const marvelHeroLoginHandler = async (req, res) => {
  try {
    validateMarvelHeroLogin(req);
    const { emailId, password } = req.body;
    const marvelHero = await User.findOne({ emailId: emailId });
    if (!marvelHero) {
      return res.status(400).send("Invalid Credential");
    }
    const isMatch = await bcrypt.compare(password, marvelHero.password);
    if (isMatch) {
      // jwt token genrate hai and send in coockie
      const token = createTokenForUser(marvelHero);
      res.cookie("token", token);
      res.send("Login successful");
    } else {
      res.status(400).send("Invalid Credential");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const marvelHeroLogoutHandler = async (req,res) => {
  res.cookie("token",null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successful!!");
}

module.exports = {
  marvelHeroSignupHandler,
  marvelHeroLoginHandler,
  marvelHeroLogoutHandler
};
