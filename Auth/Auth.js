const jwt=require("jsonwebtoken");
const User=require("../Models/Usermodels");

const Auth=async(req, res, next)=>{
    try {
        const token=req.cookies.auth;
        const verifyToken=jwt.verify(token, process.env.KEY);

        const rootUser=await User.findOne({_id: verifyToken._id, "tokens.token":token});
        if(!rootUser){
            return res.status(400).send(`no user found`)
        }

        req.token=token;
        req.rootUser=rootUser,
        req.userId=rootUser._id;
        next();
        
    } catch (error) {
        res.status(401).send(`unauthorize ${error}`);
        console.log(error);
    }
}

module.exports=Auth;