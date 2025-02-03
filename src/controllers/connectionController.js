// Post send request intrested/ignore/id

const ConnectionRequest = require("../models/connection");
const User = require("../models/user");

const ignoreOrIntrestedHandler = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unathorised User",
      });
    }

    const toUserId = req.params.toUserId;
    const fromUserId = req.user._id;
    const status = req.params.status;

    const allowedStatus = ["ignored", "intrested"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid Status Type!",
      });
    }

    const toUser = await User.findOne({ _id: toUserId });

    if (!toUser) {
      return res.status(404).json({ message: "Please Provide a valid USer" });
    }

    // if there is existing connection
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingConnectionRequest) {
      return res
        .status(400)
        .json({ message: "Connection Request Already Exist!" });
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();

    return res.status(201).json({
      message: req.user.firstName,
      data,
    });
  } catch (error) {
    return res.send(error.message);
  }
};


//api/v1/connection/review/:status/:requestId

const acceptedOrRejectedReviewHandler = async (req,res) => {

  try {

    const logedInUser = req.user;
    const {status,requestId} = req.params;
   
    if(!req.user)
    {
      return res.status(401).send("unathorized access please login!");
    }

    const allowedStatus = ["accepted","rejected"];
    if(!allowedStatus.includes(status)){
      return res.status(400).json({message:"Status not allowed"});
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id:requestId,
      toUserId:logedInUser._id,
      status:"intrested",
    });

    if(!connectionRequest)
    {
      return res.status(404).json({message:"Connection Request not found"});
    }

    connectionRequest.status = status;

    const data = connectionRequest.save();

    return res.status(201).json({message:"you are "+ status +" request",data});

    
  } catch (error) {
    return res.status(400).send("Error " + error.message)
  }
  
}

module.exports = { ignoreOrIntrestedHandler,acceptedOrRejectedReviewHandler };
