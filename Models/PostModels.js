const mongoose= require("mongoose");

const PostSchema=new mongoose.Schema({
    postpic:{
        type: String,
        required:true,
        unique: true
    },
    title:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    }
});

const Post= new mongoose.model("Post", PostSchema);

module.exports=Post;
