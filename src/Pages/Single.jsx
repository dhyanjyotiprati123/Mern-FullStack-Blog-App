import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { AiFillEdit } from "react-icons/ai";
import {AiFillDelete}  from "react-icons/ai";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Single = () => {
  const {id}=useParams();
  const [singlepost, setSinglePost]=useState({});
  const history=useHistory();
  
  useEffect(() => {
   const getSingle=async()=>{
     try {
       const post=await axios.get(`http://localhost:5000/post/${id}`);
       setSinglePost(post.data)
     } catch (error) {
       alert(error)
     }
   }
   getSingle()
  },[]);

  const DeletePost=async()=>{
    try {
      const res= await fetch("/post/delete/"+id,{
        method: "DELETE",
        headers:{
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      credentials: "include"
      })
      if(res.status === 200){
        alert("post deleted");
        history.push("/")
      }
      else{
        alert(`post can't be deleted something went wrong`)
      }
      
    } catch (error) {
      console.log(error);
    }
  }

    return (
        <div className="single">
            <div className="single-inner">
              <figure className="single-figure">
                 <img src={singlepost.postpic} alt="lagi lagi lagi" className="single-pic" />
              </figure>

              <div className="single-info">
                 <h2 className="sub-heading">{singlepost.title}</h2>
                 <p className="para">1 hour ago</p>
              </div>

              <div className="single-controls">
                 <button className="btn"><Link className="Link" to={`/editpost/${id.id}`}>Edit<AiFillEdit /> </Link></button>
                 <button className="btn" onClick={DeletePost}>Delete<AiFillDelete /> </button>
              </div>

              <div className="single-des">
                <p className="para">{singlepost.description}</p>
              </div>
              <div className="single-author">
                <p className="para">Posted By: {singlepost.author}</p>
              </div>
            </div>
        </div>
    )
}

export default Single
