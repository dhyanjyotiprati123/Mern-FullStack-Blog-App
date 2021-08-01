const express=require("express");
const Auth= require("../Auth/Auth");

const router= express.Router();

const {CreateUser, LoginUser, UpdateUser, DeleteUser, Getuser, LogoutUser}= require("../Controller/UserController");

router.get("/single",Auth, Getuser);

router.get("/logout", LogoutUser);

router.post("/signup", CreateUser);

router.post("/login", LoginUser);

router.patch("/update/:id",Auth, UpdateUser);

router.delete("/delete/:id",Auth, DeleteUser);

module.exports=router;