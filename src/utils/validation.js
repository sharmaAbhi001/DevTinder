const { model } = require("mongoose");
const validator = require("validator");

const validateMarvelHeroSignup = (req) =>{

    const  { firstName,lastName,emailId,password } = req.body;
 
    if(!firstName || !lastName)
      {
        throw new Error("Name is not Valid");
      }
    else if(!firstName >=4 && !firstName <50)
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
}

module.exports = {validateMarvelHeroSignup,validateMarvelHeroLogin};