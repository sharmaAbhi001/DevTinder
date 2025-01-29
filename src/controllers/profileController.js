const User = require("../models/user");

const profileViewHnadler = async (req,res) => {
    user = req.user;
    if(!req.user)
    {
        res.status(401).send("unathorised user");
    }
    else
    {
        try {
            const userId = user._id;
            const userData = await User.findById({_id:userId});
            res.send(userData);
        } catch (error) {
            res.send(error.message)
        }
    }
};

const profileEditHandler = async (req,res) => {
    
}

module.exports = {profileViewHnadler,profileEditHandler};