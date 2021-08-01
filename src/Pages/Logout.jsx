import React, {useContext, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import UserContex from '../Context/UserContex';


const Logout = () => {
    const history=useHistory()
    const { dispatch }=useContext(UserContex)
  
    useEffect(() => {
       const Logout=async()=>{
           try {
               const res= await fetch("/user/logout",{
                   method: "GET",
                   headers:{
                    Accept: "application/json",
                    "Content-Type": "application/json"
                 },
                 credentials: "include"
               })
               if(res.status === 200){
                   dispatch({type: "User", palyload: false})
                   alert(`you logged out successfully`)
                   history.push("/login", {replace: true})
               }
               else{
                   alert(`something went wrong`)
               }
           } catch (error) {
               console.log(error);
           }
       }
       Logout();
    })

    return (
        <div >
            
        </div>
    )
}

export default Logout
