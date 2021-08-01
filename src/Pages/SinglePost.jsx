import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SinglePost = () => {
    const id=useParams();
    const [post, setPost]=useState({});

    useEffect(()=>{
        const getPost=async()=>{
            try {
                const res= await axios.get(`http://localhost:5000/post/${id.id}`);
                setPost(res.data)
            } catch (error) {
                alert(error)
            }  
        }
        getPost();
    },[]);

    return (
        <div className="single">
            <div className="single-inner">
              <figure className="single-figure">
                 <img src={post.postpic} alt="lagi lagi lagi" className="single-pic" />
              </figure>

              <div className="single-info">
                 <h2 className="sub-heading">{post.title}</h2>
                 <p className="para">1 hour ago</p>
              </div>

              <div className="single-des">
                <p className="para">{post.description}</p>
              </div>
              <div className="single-author">
                <p className="para">Posted By: {post.author}</p>
              </div>
            </div>
        </div>
    )
}

export default SinglePost
