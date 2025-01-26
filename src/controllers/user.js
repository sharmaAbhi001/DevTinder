const User = require("../models/user");
const {validateMarvelHeroSignup} = require("../utils/validation")
const { use } = require("../routes/user");

// sighnup
const marvelHeroSignupHandler = async (req, res) => {

  try {

    // validation of data 
validateMarvelHeroSignup(req);

// encrypt password 


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

    await user.save();
    res.send("User Created Successfully!");
  } catch (error) {
    res.send(error.message);
  }
};

// feeder
const marvelOneHeroFindHandler = async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (error) {
    res.send(error);
  }
};

// update
const modifyMarvelHero = async (req, res) => {
  const marvelHeroId = req.body._id;
  const marvelHeroData = req.body;

  try {
    const ALLOWED_UPDATES = ["userId", "photoUrl", "bio", "age", "skills"];

    const isUpdateAllowed = Object.keys(marvelHeroData).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    const hero = await User.findByIdAndUpdate(
      { _id: marvelHeroId },
      marvelHeroData,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );
    res.send("User updated successfully ");
  } catch (error) {
    res.status(400).send(error);
  }
};


// login marvel hero 
const marvelHeroLoginHandler = async (req,res) => {
    

try {
    validateMarvelHeroLogin(req);
    const {emailId , password} = req.body;

    const marvelHero = await User.findOne({emailId:emailId});
    
} catch (error) {
    
}



}

module.exports = {
  marvelHeroSignupHandler,
  marvelOneHeroFindHandler,
  modifyMarvelHero,
};
