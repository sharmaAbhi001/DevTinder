// hamko loggedIn user ko dikhana hai ki uske paas kitne logog ne intrested show kiya hai jo loggedIn user me intrested hai uska bhi
// firstName lastName Skill photo to eske liye hamko user table aur connection table ke bich me ralation lagna hoga jo ki -> ref aur
// populate se ho jayega

const ConnectionRequest = require("../models/connection");
const User = require("../models/user");

const showPendingRequestHandler = async (req, res) => {
  try {
    const logedInUser = req.user;

    if (!logedInUser) {
      return res
        .status(401)
        .json({ message: "madharchod Pahle login ho jaao" });
    }

    const intrestedUser = await ConnectionRequest.find({
      toUserId: logedInUser._id,
      status: "intrested",
    }).populate("fromUserId", process.env.USER_SAFE_DATA);

    if (!intrestedUser) {
      return res
        .status(404)
        .json({ message: "You don't have any connection request !" });
    }

   


    return res.status(200).json({intrestedUser});
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

const showAllConnectionHandler = async (req, res) => {
  // login user ya to touser hoga ya from user

  try {
   

    if (!req.user) {
      return res.status(401).send("login kar bsdk!");
    }

    userId = req.user._id;

    const allConnection = await ConnectionRequest.find({
      $or: [{ fromUserId: userId }, { toUserId: userId }],
      status: "accepted",
    })
      .populate("fromUserId", process.env.USER_SAFE_DATA)
      .populate("toUserId", process.env.USER_SAFE_DATA);

    const data = allConnection.map((row) => {
      if (row.fromUserId._id.toString() === userId.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    return res.json({ data });
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

const feedApiHandler = async (req,res) => {
  
  try {

    const logedInUser = req.user;

    if(!logedInUser)
    {
      return res.status(401).json({message:"madharchod login kyu nhi karta hai"})
    }

    const pageNo = req.query.page||1;
    let limit = req.query.limit||10;

    limit = limit > 50 ? 50 : limit;

    const skip = (pageNo-1)*limit;
    
    
    const allConnectionOfLogedInUSer = await ConnectionRequest.find({
      $or: [{ fromUserId: logedInUser._id }, { toUserId: logedInUser._id }],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();

    allConnectionOfLogedInUSer.forEach(connection => {
      hideUsersFromFeed.add(connection.fromUserId.toString());
      hideUsersFromFeed.add(connection.toUserId.toString());
    });

    const users = await User.find({
      $and:[
        {_id: {$nin : Array.from(hideUsersFromFeed)}},
        {_id: {$ne :logedInUser._id}}
      ]
    }).select(process.env.USER_SAFE_DATA).
    skip(skip)
    .limit(limit);

    

    
    return res.status(200).send(users);


    
  } catch (error) {
    return res.status(404).send(error.message);
  }
}

module.exports = { showPendingRequestHandler, showAllConnectionHandler ,feedApiHandler };
