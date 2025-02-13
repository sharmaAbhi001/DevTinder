const User = require("../models/user");
const bcrypt = require("bcrypt");
const { passwordValidator } = require("../utils/validation");


// profile view controller 
const profileViewHnadler = async (req, res) => {
  const logedInUser = req.user;
   
  
  if (!req.user) {
   return res.status(401).json("unathorised user");
  } else {
    try {
      const userId = logedInUser._id;
      const user= await User.findById({ _id: userId });
    return  res.status(200).json({user});
    } catch (error) {
      res.send(error.message);
    }
  }
};

// profile edit controller 

const profileEditHandler = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send({ error: "Unauthorized User" });
    } else {
      const logedInUser = req.user;
      const userId = logedInUser._id;
      const updateData = req.body;

      const user = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
      });
      if (!user) {
        return res.status(404).send({ error: "User  not found" });
      }
      return res.status(200).json({user});
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};


const profilePasswordUpdateHandler = async (req,res) =>{

 try {
  
  passwordValidator(req);

  const {emailId} = req.user;
 const {password} = req.body;
 console.log("hiii",emailId,password);
 

 const user = await User.findOne({emailId:emailId});
 if(!user)
 {
  return res.status(401).send({message:"User does not exist "});
 }

 const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  await User.findOneAndUpdate(
      { emailId: emailId },
      { $set: { password: hashedPassword } }, 
      { new: true }
  );

  return res.status(200).json({ message: "Password updated successfully" });

 } catch (error) {
  return res.status(500).send(error.message);
 }



}

module.exports = { profileViewHnadler, profileEditHandler,profilePasswordUpdateHandler };
