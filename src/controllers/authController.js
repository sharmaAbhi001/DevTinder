const User = require("../models/user");
require('dotenv').config();
const bcrypt = require("bcrypt");
const {
  validateMarvelHeroSignup,
  validateMarvelHeroLogin,
  passwordValidator
} = require("../utils/validation");
const { createTokenForUser } = require("../services/userauth");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

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
      return res.status(400).send("Invalid email Credential");
    }
    const isMatch = await bcrypt.compare(password, marvelHero.password);
    if (isMatch) {
      // jwt token genrate hai and send in coockie
      const token = createTokenForUser(marvelHero);
      res.cookie("token", token);
      res.send("Login successful");
    } else {
      res.status(400).send("Invalid  pass Credential");
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


const marvelHeroPasswordFrogetrequest = async (req,res) => {

    try {
      const {emailId} = req.body;
      if(!emailId)
      {
       return res.status(401).send({message:"Please provide an emailId"});
      }

      const checkUserData = await User.findOne({emailId:emailId});

      if(!checkUserData)
      {
        return res
        .status(401).send({message:"Please provide valid emailId user does not exixt"});
      }

       const token = jwt.sign({emailId}, process.env.secrate_key_JWT, { expiresIn: '1h' }); 
    
       const transporter = nodemailer.createTransport({
        service:"gmail",
        secure:"trur",
        auth:{
          user:process.env.My_Email,
          pass:process.env.My_Email_pass
        }});
            
        const reciver = {
        from:"devtinderwallah@gmail.com",
        to:emailId,
        subject:"Password Reset Request",
        text:`Click on this link to generate your new password ${process.env.CLIENT_URL}forget-password/${token}`  
        }
       
      await transporter.sendMail(reciver);
      
      return res.status(200).send({message:"Password Reset Link Successfully Send To your Gmail"});
    } catch (error) {
      return res.status(500).send(error.message);
    }
  
}


const marvelHeroPasswordReset = async (req,res) => {
  try {
    passwordValidator(req);
  const {token} = req.params;
  const {password} = req.body;

  const decode = jwt.verify(token,process.env.secrate_key_JWT);

  const user = await User.findOne({emailId:decode.emailId})

  if(!user)
  {
   return res.status(401).send({message:"User does not exist"});
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  await User.findOneAndUpdate(
      { emailId: decode.emailId },
      { $set: { password: hashedPassword } }, 
      { new: true }
  );

  return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.send(error.message);
  }
}


module.exports = {
  marvelHeroSignupHandler,
  marvelHeroLoginHandler,
  marvelHeroLogoutHandler,
  marvelHeroPasswordFrogetrequest,
  marvelHeroPasswordReset
};
