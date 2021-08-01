const express=require("express");
const Auth = require("../Auth/Auth");

const router= express.Router();

const {CreatePost, GetAllPost, GetSinglePost, UpdatePost, DeletePost, GetUserPost}=require("../Controller/PostController");

router.post("/create",Auth, CreatePost);

router.get("/all", GetAllPost);

router.get('/userpost/:name', Auth, GetUserPost);

router.get("/:id", GetSinglePost);

router.patch("/update/:id",Auth, UpdatePost);

router.delete("/delete/:id",Auth, DeletePost);


module.exports=router;