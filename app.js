require('dotenv').config();
const express=require("express");
const app=express();
const cors=require("cors");
const port = process.env.PORT;
const ConnectDB= require("./DB/connect");
const UserRoutes= require("./Routes/UserRoutes");
const PostRoutes= require("./Routes/PostRoutes");
const cookieParser=require("cookie-parser");

ConnectDB();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(cookieParser());

app.use("/user", UserRoutes);
app.use("/post", PostRoutes);

app.listen(port, ()=>{
    console.log(`server started at port no: ${port}`);
})