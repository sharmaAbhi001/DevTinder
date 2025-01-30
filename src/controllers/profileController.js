const User = require("../models/user");
const bcrypt = require("bcrypt");
const { passwordValidator } = require("../utils/validation");


// profile view controller 
const profileViewHnadler = async (req, res) => {
  const user = req.user;

  
  if (!req.user) {
    res.status(401).send("unathorised user");
  } else {
    try {
      const userId = user._id;
      const userData = await User.findById({ _id: userId });
      res.send(userData);
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
      const user = req.user;
      const userId = user._id;
      const updateData = req.body;

      const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
      });
      if (!updatedUser) {
        return res.status(404).send({ error: "User  not found" });
      }
      return res.send({ updatedUser });
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
