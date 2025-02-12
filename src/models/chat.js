const mongoose = require("mongoose");
const { Schema } = mongoose;



const messageSchema = new Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type:String,
        required:true,
    },
    timestamp: { type: Date, default: Date.now }

});



const chatSchema = new Schema({
  participants: [
    { type: mongoose.Schema.Types.ObjectId,
       ref: "User", 
     required: true
     },
  ],
  messages: [messageSchema],
});


const Chat = mongoose.model("Chat",chatSchema);

module.exports = Chat;
