import axios from "axios";
import React from "react";
import { useState } from "react";
import {decode as atob, encode as btoa} from 'base-64'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
  useNavigate
  } from "react-router-dom";
import './login.css';
import {baseUrl} from '../Url'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Login (Props) {
 const [openBackdrop,setOpenBackdrop] = useState(false);
 const [username,setUsername] = useState();
 const [password,setPassword] = useState();
 const [loginsuccess,setLogins] = useState(true);
 const [messages,setMessages] = useState("");
 let navigate = useNavigate();
 

 async function Loginx() {
  setOpenBackdrop(true)
  setLogins(true);
  if(username&&password){
  try {
    const token = btoa(username + ":" + password);
    axios.defaults.headers.common['Authorization'] = `basic ${token}`;
    const result = await axios.get(baseUrl+"login").catch((error) => {
      if (error.response) {
        setMessages("Your username or password wrong !")
        setLogins(false)
        setOpenBackdrop(false)
      }
    });
    if(result){
      localStorage.setItem('NAME', result.data.firstname + " " +result.data.lastname);
      localStorage.setItem('ROLE', result.data.role);
      localStorage.setItem('TOKEN',token);
      localStorage.setItem('ID',result.data.id);
      setLogins(true);
      setOpenBackdrop(false)
      navigate("../")
    }
    else {
      setLogins(false)
      setOpenBackdrop(false)
    }

    
  } catch (error) {
    
  }}
  else{
    setLogins(false)
    setMessages("Please enter your username and password !")
    setOpenBackdrop(false)
    
  }


}

const handleChangeUserName=(event)=>{
  setUsername(event.target.value);
}



const handleChangePassword=(event)=>{
  setPassword(event.target.value);
}

  return <div className="body login">
	<div className="wrapper fadeInDown">
  <div id="formContent">
    <h2 className="active"> Sign In </h2>
    <div className="fadeIn first">
      <img src="https://cdn.discordapp.com/attachments/948104314432389150/954697000731934770/HRM_Logo.png" id="icon" />
    </div>
    <div>
      <input type="text"  className="fadeIn second" id="username" placeholder="login" onChange={handleChangeUserName} />
      <input type="password"  className="fadeIn third" id="password" placeholder="password" onChange={handleChangePassword} />
      {loginsuccess?<p style={{padding: "11px"}}></p>:<p className="LoginFail">{messages}</p>}
      <input type="submit" className="fadeIn fourth"  onClick = {Loginx}/>
    </div>
    <div id="formFooter">
      <a className="underlineHover" href="#" onClick={()=>navigate("/forgot")}>Forgot Password?</a>
    </div>
  </div>
</div>
<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
        
      >
        <CircularProgress color="inherit" />
      </Backdrop>
</div>
}


export default Login;
  