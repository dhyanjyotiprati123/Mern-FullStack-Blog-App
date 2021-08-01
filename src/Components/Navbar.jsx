import React, { useContext } from 'react';
import { NavLink , Link} from 'react-router-dom';

import { ImUser } from 'react-icons/im';
import {AiOutlineHome} from "react-icons/ai";
import { IoMdCreate } from "react-icons/io";
import { BsFillPersonDashFill } from "react-icons/bs";
import { FaUserLock } from "react-icons/fa";
import UserContex from '../Context/UserContex';

const RenderMenu=()=>{
    const { state }=useContext(UserContex)
    if(state){
        return(
            <div className="navbar">
            <div className="navbar-logo">
               B
            </div>

            <ul className="navbar-list">
              <li className="navbar-item"><NavLink className="navbar-link" to="/"><AiOutlineHome /> Home</NavLink></li>
              <li className="navbar-item"><NavLink className="navbar-link" to="/create"><IoMdCreate /> Create</NavLink></li>
              <li className="navbar-item"><NavLink className="navbar-link" to="/signup"><FaUserLock /> Register</NavLink></li>
            </ul>

            <div className="navbar-control">
               <Link className="link" to="/logout">Logout</Link>
               <Link className="link" to="/user"><ImUser /></Link>
            </div>
        </div>
        )
    }
    else{
        return(
            <div className="navbar">
            <div className="navbar-logo">
               B
            </div>

            <ul className="navbar-list">
              <li className="navbar-item"><NavLink className="navbar-link" to="/"><AiOutlineHome /> Home</NavLink></li>
              <li className="navbar-item"><NavLink className="navbar-link" to="/login"><BsFillPersonDashFill /> Login</NavLink></li>
              <li className="navbar-item"><NavLink className="navbar-link" to="/signup"><FaUserLock /> Register</NavLink></li>
            </ul>

            <div className="navbar-control">
              <h5 className="heading-5">Login/Register: to continue</h5>
            </div>
        </div>
        )
    }
}


const Navbar = () => {
   
    return (
       <RenderMenu />
    )
}

export default Navbar
