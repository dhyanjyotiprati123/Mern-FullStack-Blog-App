import React, { useState } from 'react';
import { BsCardImage } from 'react-icons/bs';
import { FaSkull } from 'react-icons/fa';
import { GoNote } from "react-icons/go";
import { SiPostwoman } from "react-icons/si";
import { useHistory } from 'react-router-dom';
import create from "../Assets/add.svg";

const Create = () => {
   const [post, setPost]= useState({
      postpic: "",
      title: "",
      description: ""
   })

   const history=useHistory();

   const handleInput=(e)=>{
      const {name, value}=e.target;
      setPost({...post, [name]: value})
   }

   const CreateBlog = async(e)=>{
       e.preventDefault();
       try {
          const user= await fetch("/user/single",{
             method: "GET",
             headers:{
                Accept: "application/json",
                "Content-Type": "application/json"
             },
             credentials: "include"
          })
          const data= await user.json()
         
         if(user.status === 200){
            try {
               const {postpic, title, description}=post;
               const author=data.name;

               const Post=await fetch("/post/create",{
                  method: "POST",
                  headers: {
                     "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                     postpic, title, description, author
                  })
               })
               const newPost= await Post.json();
               console.log(newPost);
               
            } catch (error) {
               console.log(error);
            }
         }else if(user.status !== 200){
            alert(`you are not authorized to visit the page`)
            history.push("/login")
         }
          
          
       } catch (error) {
          alert(error)
       }
       setPost({
         postpic: "",
         title: "",
         description: ""
       })
   }

   const Icon={fontSize: "2.5rem"}
    return (
        <div className="container">
            <h1 className="sub-heading">Create Your Own Blog</h1>
            <div className="container-inner">
                <form method="POST" className="container-form">
                  <div className="container-box">
                     <BsCardImage style={Icon} />
                     <input type="text" className="input" placeholder="enter your blog pic url" name="postpic" value={post.postpic} onChange={handleInput} />
                  </div>
                  <div className="container-box">
                     <FaSkull style={Icon} />
                     <input type="text" className="input" placeholder="enter your blog title" name="title" value={post.title} onChange={handleInput} />
                  </div>
                  <div className="container-box">
                     <GoNote style={Icon} />
                     <input type="text" className="input" placeholder="enter your blog description" name="description" value={post.description} onChange={handleInput} />
                  </div>
                  <div className="container-box">
                    <button className="btn" type="submit" onClick={CreateBlog}>Publish Now <SiPostwoman /> </button>
                  </div>
                </form>

                <div className="container-pic">
                   <figure className="container-figure">
                      <img src={create} alt="dil zale" className="container-img" />
                   </figure>
                </div>
            </div>
        </div>
    )
}

export default Create
