import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomeCard from '../Components/HomeCard';

const Home = () => {
    const [posts, setPosts]=useState([]);
    
    useEffect(()=>{
        const getPosts=async()=>{
            try {
              const res=  await axios.get("http://localhost:5000/post/all");
        
              setPosts(res.data)

            } catch (error) {
                alert(error)
            }
        }
        getPosts();
    },[])

    return (
        <div className="home">
           <div className="home-main">
              <h1 className="main-heading">Welcome To Blog XXX Pro</h1>
              <h2 className="sub-heading">Our recent Blogs</h2>
           </div>

           <div className="home-hero">
              {
                  posts.map((value)=>{
                     
                      return(
                          <HomeCard 
                            key={value._id}
                            path={value._id}
                            img={value.postpic}
                            title={value.title}
                            description={value.description}
                            author={value.author}
                          />
                      )
                  })
              }
           </div>
        </div>
    )
}

export default Home
