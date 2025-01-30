const User = require("../models/user");
const { validateMarvelHeroUpdate } = require("../utils/validation");

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

module.exports = { profileViewHnadler, profileEditHandler };
