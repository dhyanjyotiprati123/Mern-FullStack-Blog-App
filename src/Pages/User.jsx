import React, { useEffect, useState } from 'react';
import PostCard from '../Components/PostCard';
import {Link, useHistory} from "react-router-dom";


const About = () => {
    const [root, setRoot]=useState({});
    const [userpost, setUserpost]= useState([]);
    const history=useHistory();
 
   useEffect(()=>{
       const GetRootuser=async()=>{
           try {
               const user= await fetch("/user/single",{
                method: "GET",
                headers:{
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
               });
              if(user.status === 200){
                const data= await user.json();
                setRoot(data)
              }else{
                  history.push("/login")
              }
              
           } catch (error) {
              alert(error) 
           }
       }
       GetRootuser()
   }, []);

    useEffect(()=>{
        const getUserPost=async()=>{
            try { 
                const res=await fetch("/post/userpost/"+root.name,{
                method: "GET",
                headers:{
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
                    const post= await res.json();
                   
                    setUserpost(post)
               
                
            } catch (error) {
                alert(error)
            }
        } 
        
        getUserPost();
    });

    const DeleteUser=async()=>{
        try {
            const res=await fetch("/user/delete/"+root._id,{
                method: "DELETE",
                headers:{
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            if(res.status === 200){
                alert(`user deleted`)
                history.push("/")
            }
            else{
                alert(`something went wrong`)
                history.push('/login')
            }
        } catch (error) {
            
        }
    }


    return (
        <div className="user">
            <h2 className="sub-heading text-center">Welcome Dhyan</h2>
            <div className="user-info">
                <figure className="user-figure">
                  <img src={root.profilepic} alt="sakt launda" className="user-pic" />
                </figure>

                <div className="user-profile">
                   <h3 className="heading-3">{root.name}</h3>
                   <h3 className="heading-3">{root.email}</h3>
                   <h3 className="heading-3">92021025410</h3>
                </div>

                <div className="user-controls">
                    <button className="btn"><Link className="Link" to={`/update/${root._id}`}>Edit Your Account</Link></button>
                    <button className="btn" onClick={DeleteUser}>Delete Account</button>
                </div>
            </div>

            <div className="user-posts">
                <h1 className="user-posts-heading">Your Posts Till Now</h1>
                <div className="user-posts-cards">
                   {
                       userpost.map((value)=>{
                        
                           return(
                               <PostCard
                                 key={value._id}
                                 img={value.postpic}
                                 title={value.title}
                                 des={value.description}
                                 path={value._id}
                               />
                           )
                       })
                   }
                </div>
            </div>
        </div>
    )
}

export default About
