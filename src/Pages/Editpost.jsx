import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Girl from "../Assets/girl.svg";

import {AiOutlinePicture} from "react-icons/ai";
import {GiPickOfDestiny} from "react-icons/gi";
import {GiAxeSwing} from "react-icons/gi";
import axios from 'axios';

const Editpost = () => {
    const {id}=useParams();
    const Icon={fontSize: "2.5rem"};
    const [newPost, setNewPost]=useState({
        postpic:"",
        title:"",
        description:""
    })

    const handleChange=(e)=>{
        const {name, value}=e.target;
        setNewPost({...newPost, [name]:value})
    }

    const EditPost=async(e)=>{
        e.preventDefault();
        try {
            const {postpic, title, description}=newPost;
            const updatePost={postpic, title, description}

          await axios.patch(`http://localhost:5000/post/update/${id}`, updatePost);
             
        } catch (error) {
            alert(error)
        }
    }
    
    return (
        <div className="container">
            <div className="container-inner">
              <div className="container-pic">
                <figure className="container-figure">
                  <img src={Girl} alt="lady" className="container-img" />
                </figure>
              </div>

              <form method="PATCH" className="container-form">
                <div className="container-box">
                  <AiOutlinePicture style={Icon} />
                  <input type="text" className="input" placeholder="edit your pic" name="postpic" value={newPost.postpic} onChange={handleChange} />
                </div>
                <div className="container-box">
                  <GiPickOfDestiny style={Icon} />
                  <input type="text" className="input" placeholder="edit your post title" name="title" value={newPost.name} onChange={handleChange} />
                </div>
                <div className="container-box">
                  <GiAxeSwing style={Icon} />
                  <input type="text" className="input" placeholder="edit your post description" name="description" value={newPost.description} onChange={handleChange} />
                 </div>
                 <div className="container-box">
                   <button className="btn" type="submit" onClick={EditPost} >Edit Post</button>
                </div>
              </form>
            </div>
        </div>
    )
}

export default Editpost
