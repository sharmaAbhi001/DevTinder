const socket = require("socket.io");
const crypto = require("crypto");
const Chat = require("../models/chat");
const { log } = require("console");

const generateRoomId = (userId, targetUserId) => {
  roomId = [userId, targetUserId].sort().join("_");

  const hashRoomId = crypto.createHash("sha256").update(roomId).digest("hex");

  return hashRoomId;
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    // handel function

    socket.on("joinChat", ({ firstName, targetUserId, userId }) => {
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
          console.log(error);
        }
      }
    );

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
