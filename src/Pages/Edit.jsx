import React, { useState } from 'react';
import edit from "../Assets/edit.svg";
import { useParams } from 'react-router-dom';
import {AiOutlineCamera} from "react-icons/ai";
import {BsPeopleCircle} from "react-icons/bs";
import {IoMailOpenOutline} from "react-icons/io5";
import {FaLock} from "react-icons/fa";
import axios from 'axios';

const Edit = () => {
    const [client, setClient]=useState({
        profilepic: "",
        name: "",
        email: "",
        password: ""
    });

    const {id}=useParams();
   

    const handleChange=(e)=>{
        const {name, value}= e.target;
        setClient({...client, [name]: value})
    }

    const UpdateUser=async(e)=>{
        e.preventDefault();
        const {profilepic, name, email, password}=client;
        try {
           const updateUser={
               profilepic, name, email, password
           }
           const res= await axios.patch(`http://localhost:5000/user/update/${id}`, updateUser);
           console.log(res);
        } catch (error) {
            alert(error)
        }
        setClient({
            profilepic: "",
            name: "",
            email: "",
            password: ""
        })
    }

    const Icon={fontSize: "2.5rem", color: "#003638"}
    return (
        <div className="container">
            <div className="container-inner">
               <div className="container-pic">
                 <figure className="container-figure">
                   <img src={edit} alt="bengan fry" className="container-img" />
                 </figure>
               </div>

               <form method="PATCH" className="container-form">
                   <div className="container-box">
                      <AiOutlineCamera style={Icon} />
                      <input type="text" className="input" placeholder="update your profile pic"  name="profilepic" value={client.profilepic} onChange={handleChange} />
                   </div>
                   <div className="container-box">
                     <BsPeopleCircle style={Icon} />
                     <input type="text" className="input" placeholder="update your name"  name="name" value={client.name} onChange={handleChange} />
                   </div>
                   <div className="container-box">
                      <IoMailOpenOutline style={Icon} />
                      <input type="email" className="input" placeholder="update your email"  name="email" value={client.email} onChange={handleChange} />
                   </div>
                   <div className="container-box">
                      <FaLock style={Icon} />
                     <input type="password" className="input" placeholder="update your password"  name="password" value={client.password} onChange={handleChange} />
                   </div>
                   <div className="container-box">
                     <button className="btn" type="submit" onClick={UpdateUser}>Update</button>
                   </div>
               </form>
            </div>
        </div>
    )
}

export default Edit
