const mongoose = require("mongoose");
const {Schema} = mongoose;


const connectionRequestSchema = new Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true, 
    },
    status:{
        type:String,
        enum:{
            values:["ignored", "accepted","intrested","rejected"],
            message:`{values} is incorrect status type`,
        }
    },
},
{timestamps:true}
);

connectionRequestSchema.index({fromUserId:1,toUserId:1});


connectionRequestSchema.pre("save",function (next) {

    const connectionRequest = this;
    try {
        if(connectionRequest.fromUserId.equals(connectionRequest.toUserId))
        {
            throw new Error("You Cannot send freind request to yourself");
        }
        next();
    } catch (error) {
        next(error);
    }
    
});

const ConnectionRequest = mongoose.model('ConnectionRequest',connectionRequestSchema);

module.exports = ConnectionRequest;