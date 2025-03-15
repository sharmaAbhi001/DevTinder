const { model } = require("mongoose");
const validator = require("validator");
const { updateSearchIndex } = require("../models/user");

const validateMarvelHeroSignup = (req) =>{

    const  { firstName,lastName,emailId,password } = req.body;
 
    if(!firstName || !lastName)
      {
        throw new Error("Name is not Valid");
      }
    else if(!firstName >=4 || !firstName <50)
        {
          throw new Error("Please Enter valid Name ");
        }     
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid!");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please Enter a Strong Password");
    }    
};

const validateMarvelHeroLogin = (req) =>{
    const {emailId} = req.body;
    if(!validator.isEmail(emailId))
    {
        throw new Error("Please Enter valid Email");
    }
};

const allowedField = ["gender" , "age", "skills", "photoURL","bio"];

const validateMarvelHeroUpdate = (req,res,next) =>{

  const updates = Object.keys(req.body);

  const isValidUpdate = updates.every(field => allowedField.includes(field));
  if(!isValidUpdate){
    return res.status(400)
    .json({error:"Invalid field in update request"});
  }

  next();

}


const passwordValidator = (req) =>{
 const  {password} = req.body;
 if(!validator.isStrongPassword(password)){
  throw new Error("Please Enter a Strong Password");
};

}
module.exports = {validateMarvelHeroSignup,validateMarvelHeroLogin,validateMarvelHeroUpdate,passwordValidator};