const socket = require("socket.io");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    // handel function

    socket.on("joinChat", ({ firstName, targetUserId, userId }) => {
      const roomId = [targetUserId, userId].sort().join("_");

      console.log(firstName + " join Chat roomId " + roomId);
      socket.join(roomId); 
    });

    socket.on("sendMessage", ({firstName,targetUserId,userId,text}) => {

     const roomId = [targetUserId,userId].sort().join("_");
     console.log(roomId);
     
     io.to(roomId).emit("messageReceived",{firstName,text,userId})
        
    });

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
