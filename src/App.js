import React, {useReducer} from 'react';
import "./Style/main.css";
import Navbar from "./Components/Navbar";
import {  Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Create from './Pages/Create';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import User from "./Pages/User";
import Single from './Pages/Single';
import Edit from './Pages/Edit';
import SinglePost from './Pages/SinglePost';
import Editpost from './Pages/Editpost';
import Logout from './Pages/Logout';
import UserContex from './Context/UserContex';
import reducer, {initialState} from './Context/Usereducer';

const Routing=()=>{
   return(
      <div>
      <Switch>
          <Route exact path="/" > <Home /> </Route>
       </Switch>
       <Switch>
         <Route exact path="/create" > <Create /> </Route>
      </Switch>
      <Switch>
         <Route exact path="/login" > <Login /> </Route>
      </Switch>
      <Switch>
         <Route exact path="/signup" > <Signup /> </Route>
      </Switch>
      <Switch>
         <Route exact path="/user" > <User /> </Route>
      </Switch>
      <Switch>
         <Route exact path="/update/:id" > <Edit /> </Route>
      </Switch>
      <Switch>
         <Route exact path="/single/:id" > <Single /> </Route>
      </Switch>
      <Switch>
         <Route exact path="/singlepost/:id" > <SinglePost /> </Route>
      </Switch>
      <Switch>
         <Route exact path="/editpost/:id" > <Editpost /> </Route>
      </Switch>
      <Switch>
         <Route exact path="/logout" > <Logout /> </Route>
      </Switch>
      </div>
   )
}

const App = () => {
 const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div>
      <UserContex.Provider value={{state, dispatch}}>
       <Navbar />
       <Routing />
      </UserContex.Provider>
    </div>
  )
}

export default App;


