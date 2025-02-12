const express = require("express");
const Chat = require("../models/chat");
const chatRouter = express.Router();

chatRouter.get("/chat/:id", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "login kar madhrchod" });
  }

  try {
    const userId = req.user._id;
    const targetUserId = req.params.id;

    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    }).populate({ path: "messages.senderId", select: "firstName lastName" });

    if (!chat) {
      chat = new Chat({
        participants: [userId, targetUserId],
        messages: [],
      });

      await chat.save();
    }

    res.send(chat);
  } catch (error) {
    console.log(error);
  }
});

module.exports = chatRouter;
