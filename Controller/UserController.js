const User=require("../Models/Usermodels");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const Post = require("../Models/PostModels");

const CreateUser=async(req, res)=>{
    const {profilepic, name, email, password, cpassword}=req.body;

    if(!profilepic || !name || !email || !password || !cpassword){
        return res.status(400).send(`please fill all the fields`)
    }

    try {
        const existUser= await User.findOne({email: email})
        if(existUser){
            return res.status(402).send(`user already exist please login to continue`)
        }
        const salt=await bcrypt.genSalt(12);
        const hashPassword=await bcrypt.hash(password, salt);
        const ChashPassword=await bcrypt.hash(cpassword, salt);

        const newUser=new User({
            profilepic, name, email, password: hashPassword, cpassword: ChashPassword
        });

        await newUser.save();
        res.status(201).send(newUser)
        
    } catch (error) {
        res.status(500).send(error)
    }
}

const LoginUser=async(req,res)=>{
    const {email, password}=req.body;
    let token;
    try {
        const findUser=await User.findOne({email: email});
        if(!findUser){
            return res.status(400).send(`invalid credentials`)
        }
        const isMatch= bcrypt.compare(password, findUser.password);
        token= await findUser.generateAuthToken();
        res.cookie("auth", token, {
            expires: new Date(Date.now()+ 25892000000),
            httpOnly: true
        })

        if(isMatch){
            res.status(200).send(findUser)
        }
        else{
            return res.status(422).send(`the user does not exist`)
        }
        
    } catch (error) {
        res.status(500).send(error)
    }
}

const UpdateUser=async(req, res)=>{
    const {profilepic, name, email, password}=req.body
    try {
        const salt= await bcrypt.genSalt(12);
        const hashPassword= await bcrypt.hash(password, salt)
        const update=await User.findByIdAndUpdate(req.params.id, {
            $set: {
                profilepic, name, email, password: hashPassword
            }
        },{new: true});

        res.status(201).send(update)
        
    } catch (error) {
        re.status(400).send(error)
    }
}

const DeleteUser=async(req,res)=>{
    try {
       const user= await User.findById(req.params.id);
       if(user){
           try {
               await Post.deleteMany({author: user.name});
               await user.delete();
               res.status(200).send(`user deleted`)
           } catch (error) {
               res.status(400).send(error)
           }
       }
        
    } catch (error) {
        res.status(500).send(error)
    }
}

const Getuser=async(req,res)=>{
    try {
        res.status(200).send(req.rootUser); 
    } catch (error) {
        res.status(400).send(error)
    }
}

const LogoutUser=(req, res)=>{
    res.clearCookie("auth", {path: "/"});
    res.status(200).send(`user logout successfully`)
}

exports.CreateUser=CreateUser;
exports.LoginUser=LoginUser;
exports.UpdateUser=UpdateUser;
exports.DeleteUser=DeleteUser;
exports.Getuser=Getuser;
exports.LogoutUser=LogoutUser;