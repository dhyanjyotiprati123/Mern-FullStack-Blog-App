
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { AiFillMail } from 'react-icons/ai';
import { RiLockPasswordLine } from "react-icons/ri";
import { FiArrowRightCircle } from "react-icons/fi";
import UserContex from '../Context/UserContex';

import Unlock from "../Assets/login.svg"


const Login = () => {

   const { dispatch }=useContext(UserContex)


    const [user, setUser]=useState({
       email: "",
       password: ""
    });

    const history=useHistory();

    const handleInput=(e)=>{
       const {name, value}=e.target;
       setUser({...user, [name]: value})
    }

    const LoginUser=async(e)=>{
       e.preventDefault();
       const {email, password}=user
       try {
         const res=await fetch("/user/login", {
            method: "POST",
            headers:{
               "Content-Type": "application/json"
            },
            body:JSON.stringify({
               email, password
            })
            
         })
         const data= await res.json()
         console.log(data);
         if(res.status !== 200 || !data){
            alert(`invalid credentials`)
         }
         else{
            dispatch({type: "User", payload: true})
            alert(`login successfull`)
            history.push("/")
         }
       } catch (error) {
          console.log(`cannot login ${error}`);
       }
     
       setUser({
         email: "",
         password: ""
       })
    }

    const Icon={fontSize: "2.5rem"}
    return (
        <div className="container">
            <h2 className="sub-heading">Please Login to continue ....</h2>

            <div className="container-inner">
               <form  method="POST" className="container-from">
                 <div className="container-box">
                    <AiFillMail style={Icon} />
                    <input type="email" className="input" placeholder="please enter your email" name="email" value={user.email} onChange={handleInput} />
                 </div>
                 <div className="container-box">
                    <RiLockPasswordLine style={Icon} />
                    <input type="password" className="input" placeholder="enter your password" name="password" value={user.password} onChange={handleInput} />
                 </div>
                 <div className="container-box">
                    <button className="btn" type="submit" onClick={LoginUser}>Login <FiArrowRightCircle /> </button>
                 </div>
               </form>

               <div className="container-pic">
                 <figure className="container-figure">
                   <img src={Unlock} alt="galti sa mistake" className="container-img" />
                 </figure>
               </div>
            </div>
        </div>
    )
}

export default Login
