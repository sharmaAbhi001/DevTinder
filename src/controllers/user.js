const User = require("../models/user");


const marvelHeroSignupHandler = async (req,res) => {
    const UserDetails = req.body;
     
    const user = new User({
        firstName:UserDetails.firstName,
        lastName:UserDetails.lastName,
        emailId:UserDetails.emailId,
        password:UserDetails.password,
        age:UserDetails.age,
        gender:UserDetails.gender,
    });
    
    try {
        await user.save();
        res.send("User Created Successfully!");
    } catch (error) {
        res.send(error);
    }
    
};


module.exports = {marvelHeroSignupHandler}