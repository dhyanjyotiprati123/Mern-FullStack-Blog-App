const Post=require("../Models/PostModels");

const CreatePost=async(req, res)=>{
    const {postpic, title, description, author}=req.body;
    if(!postpic || !title || !description || !author){
        return res.status(422).send(`please fill all the fields`)
    }
    try {
        const newPost=new Post({
            postpic, title, description, author
        })
        await newPost.save();
        res.status(201).send(newPost);
        
    } catch (error) {
        res.status(500).send(error)
    }
}

const GetAllPost=async(req, res)=>{
    try {
        const posts=await Post.find({});
        res.status(200).send(posts)
        
    } catch (error) {
        res.status(500).send(error)
    }
}

const GetUserPost=async(req, res)=>{
    try {
       
        const userpost= await Post.find({author: req.params.name});
        res.status(200).send(userpost);
        
    } catch (error) {
        res.status(400).send(error)
    }
}

const GetSinglePost=async(req, res)=>{
    try {
        const single=await Post.findById(req.params.id);
        res.status(200).send(single)
        
    } catch (error) {
        res.status(402).send(error)
    }
}

const UpdatePost=async(req, res)=>{
    try {
        const update=await Post.findByIdAndUpdate(req.params.id,{
            $set: req.body
        }, {new: true});

        res.status(201).send(update);
        
    } catch (error) {
        res.status(500).send(error)
    }
}

const DeletePost=async(req, res)=>{
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).send(`post deleted`)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.CreatePost=CreatePost;
exports.GetAllPost=GetAllPost;
exports.GetSinglePost=GetSinglePost;
exports.UpdatePost=UpdatePost;
exports.DeletePost=DeletePost;
exports.GetUserPost=GetUserPost;