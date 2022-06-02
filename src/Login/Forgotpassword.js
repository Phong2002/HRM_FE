import './login.css'
import axios from "axios";
import {
  useNavigate
  } from "react-router-dom";
  import { useState } from "react";
  import {baseUrl} from '../Url'
  import { ToastContainer, toast } from 'react-toastify';
function ForgotPassword(){

  const toastSuccess = () => toast.success('Gửi yêu cầu thành công', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });;

const toastFail = () => toast.error('Gửi yêu cầu thất bại', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

  const [Email,SetEmail]= useState('');
  const [emailExist,setEmailExist] = useState(true);
  const [message,setMessage] = useState("");
    
  let navigate = useNavigate();

   const handleChangeEmail=(e)=>{
        SetEmail(e.target.value)
    }


    async function handleResetPassword() {
      setEmailExist(true);
      if(Email){
        try {
          setMessage("Email is not exist !")
         let result = await axios.post(`${baseUrl}resetpassword/${Email}`,).catch((error) => {
            if (error.response.status===400) {
             setEmailExist(false);
             toastFail();
            }
            else
            if (error.response.status===500){
              navigate('/page404');
            }
          
          });
          
          if(result.status===208){
            setMessage("This email has asked for a password reset!")
            setEmailExist(false);
            toastFail();
          }

          else if(result.status===200){
            SetEmail("");
            toastSuccess();
          }
          
        } catch (error) {
          
        }
      
      
      }
      else{
        setEmailExist(false);
        setMessage("Please enter your email address");
      }}

    return <>
   <div className="body login">
	<div className="wrapper fadeInDown">
  <div id="formContent">
    <h2 className="active"> Forgot Password </h2>
    <div className="fadeIn first">
      <img src="https://cdn.discordapp.com/attachments/948104314432389150/954697000731934770/HRM_Logo.png" id="icon" />
    </div>
    <div>
        <p className="fadeIn second">Enter your registered email to reset your password.</p>
      <input type="text"  className="fadeIn second" placeholder="Your email" value={Email} onChange={handleChangeEmail}/>
      {emailExist?<p style={{padding: "11px"}}></p>:<p className="LoginFail">{message}</p>}
      <input type="submit" className="fadeIn fourth"  title="Reset Password" onClick={handleResetPassword}/>
    </div>
    <div id="formFooter">
    <h5>Already have an account? <a href="#" onClick={()=>navigate("/login")}>Sign In.</a></h5>
    </div>
  </div>
</div>
</div>

<ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
/>
    </>
}

export default ForgotPassword;