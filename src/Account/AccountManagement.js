import { useEffect, useState } from "react";
import RequestResetPassword from "./RequetResetPassword"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import {baseUrl} from '../Url'


function AccountManagement(){

  const toastSuccess = (username,confirm) => toast.success(((confirm==="confirm")?"Xác nhận":"Từ chối")+' yêu cầu cấp lại mật khẩu tài khoản'+username+" thành công", {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });;

const toastFail = (username,confirm) => toast.error(((confirm==="confirm")?"Xác nhận":"Từ chối")+' yêu cầu cấp lại mật khẩu tài khoản'+username+" thất bại", {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

    const [requests,setRequests] = useState([]);

    async function Request() {
        try {
          axios.defaults.headers.common['Authorization'] = `Basic ${localStorage.getItem('TOKEN')}` ; 
          const result = await axios.get(baseUrl +"resetpassword")
           setRequests(result.data)
        } catch (error) {
          console.error(error);
        }
    }

    const resetData=(token)=>{
      let newData = requests.filter(data=>data.token !==token)
      setRequests([...newData])
    }

    async function ConfirmRequest(confirm,token,username) {
      
      var axios = require('axios');

      var config = {
        method: 'delete',
        url: `${baseUrl}resetpassword/${confirm}/${token}`,
        headers: { 
          'Authorization': `Basic ${localStorage.getItem("TOKEN")}`, 
          'Content-Type': 'application/json', 

        },
      };
      
      axios(config)
      .then(function (response) {
        toastSuccess(username,confirm);
        resetData(token);
      })
      .catch(function (error) {
          toastFail(username,confirm);
      });
     
    }
    
    useEffect(()=>{Request()},[])


    return <>
    {requests.map(data=><RequestResetPassword username={data.userName} token = {data.token} confirm={ConfirmRequest} key={data.token} />)}
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

export default ResetPassword