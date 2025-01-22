 const adminAuth = (req,res,next) =>{
    console.log("Admin auth is getting Checked !!");
    const token = "zyz";
    const isAdminAuthorized = token==="xyz";
    if(!isAdminAuthorized){
        res.status(401).send("Unathorized request");

    }
    else{
        next();
    }
    
};

module.exports = {
    adminAuth,
}
