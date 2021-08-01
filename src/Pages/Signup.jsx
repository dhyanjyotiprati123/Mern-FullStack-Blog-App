import React, { useState } from 'react';
import axios from 'axios';
import validator from 'validator';
import {CgProfile} from "react-icons/cg";
import { AiFillMail } from 'react-icons/ai';
import { RiLockPasswordLine } from "react-icons/ri";
import {BiRename} from "react-icons/bi";
import {AiOutlineUserAdd} from "react-icons/ai";
import { useHistory } from 'react-router';

import Sign from "../Assets/reg.svg";


const Signup = () => {
    const [user, setUser]=useState({
       profilepic:"",
       name: "",
       email: "",
       password: "",
       cpassword: ""
    });

    const history=useHistory();

    const inputHandler=(e)=>{
        const {name, value}=e.target;
        setUser({...user, [name]:value})
    }

    const registerUser= async(e)=>{
       e.preventDefault();
       const userEmail=user.email;
       const currentPass=user.password;
       const currentCpass=user.cpassword;
     
       const validateEmail=validator.isEmail(userEmail);
       if(!validateEmail){
          alert(`${userEmail} is not a valid email`)
       }
       if(currentPass === currentCpass){
           try {
              const NewUser={
                 profilepic: user.profilepic,
                 name: user.name,
                 email: userEmail,
                 password: currentPass,
                 cpassword: currentCpass
              }

             const res= await axios.post("http://localhost:5000/user/signup", NewUser);
             if(res.status === 201){
               history.push("/login")
             }else{
                alert(`cannot post internal server error`)
             }
             
              
           } catch (error) {
              console.log(error);
           }
       }
       else{
          alert(`password did not match`)
       }

       setUser({
         profilepic:"",
         name: "",
         email: "",
         password: "",
         cpassword: ""
       })
    }

    const Icon={fontSize: "2.5rem"}
    return (
        <div className="container">
           <h2 className="sub-heading">please register to create your first blog</h2>
            
           <div className="container-inner">
              <form method="POST" className="container-form">
                 <div className="container-box">
                    <CgProfile style={Icon} />
                   <input type="text" className="input" placeholder="please enter your profile pic" name="profilepic" value={user.profilepic} onChange={inputHandler} />
                 </div>
                 <div className="container-box">
                    <BiRename style={Icon} />
                   <input type="text" className="input" placeholder="please enter your full name" name="name" value={user.name} onChange={inputHandler} />
                 </div>
                 <div className="container-box">
                    <AiFillMail style={Icon} />
                   <input type="email" className="input" placeholder="please enter email" name="email" value={user.email} onChange={inputHandler} />
                 </div>
                 <div className="container-box">
                    <RiLockPasswordLine style={Icon} />
                   <input type="password" className="input" placeholder="please create your password" name="password" value={user.password} onChange={inputHandler} />
                 </div>
                 <div className="container-box">
                    <RiLockPasswordLine style={Icon} />
                   <input type="password" className="input" placeholder="re enter your password" name="cpassword"  value={user.cpassword} onChange={inputHandler}/>
                 </div>
                 <div className="container-box">
                    <button className="btn" onClick={registerUser}>Register <AiOutlineUserAdd /> </button>
                 </div>
              </form>

              <div className="container-pic">
              <figure className="container-figure">
                <img src={Sign} alt="galti sa mistake" className="container-img" />
              </figure>
            </div>
           </div>
        </div>
    )
}

export default Signup
