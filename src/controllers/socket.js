const socket = require("socket.io");
const crypto = require("crypto");
const Chat = require("../models/chat");
const { log } = require("console");
const { validateToken } = require("../services/userauth");
const ConnectionRequest = require("../models/connection");

const generateRoomId = (userId, targetUserId) => {
  roomId = [userId, targetUserId].sort().join("_");

  const hashRoomId = crypto.createHash("sha256").update(roomId).digest("hex");

  return hashRoomId;
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      // origin:"http://localhost:5173",
      origin: "https://dev-tinder-frontend-alpha.vercel.app",
      credentials: true,
    },
  });


  // middleware to verify user 
// io.use((socket,next)=>{
//   const token = socket.handshake.auth.token;
//   if(!token)
//   {
//     return next(new Error("Authentication error: No token provided"));
//   }
//   try {
//     const payload = validateToken(token);
//   socket.user = payload;
//   } catch (error) {
//     return next(new Error("Token validation error"))
//   }
//   next();
// })


  io.on("connection", (socket) => {
    // handel function
    socket.on("joinChat",  async ({ firstName, targetUserId, userId }) => {
      const connection = await ConnectionRequest.findOne({
        $or:[
          {fromUserId:targetUserId,toUserId:userId, status: "accepted"},
          {fromUserId:userId,toUserId:targetUserId, status: "accepted"}
        ]
      });
      if (!connection) {
        socket.emit("error", { message: "Madarchod! Gaand marvao, bina friend request ke msg bhejne chale ho" });
        return;
      }
      const roomId = generateRoomId(userId, targetUserId);
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, targetUserId, userId, text }) => {
        try {
          const roomId = generateRoomId(userId, targetUserId);

          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });

            await chat.save();
          }

          chat.messages.push({
            senderId: userId,
            text,
          });

          await chat.save();

          io.to(roomId).emit("messageReceived", { firstName, text, userId });
        } catch (error) {
        }
      }
    );

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
