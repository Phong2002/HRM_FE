
import {Link,Routes,Route,Outlet, useNavigate} from 'react-router-dom';
import './Account.css'
import {Button} from 'reactstrap'
import { useEffect, useState } from 'react';
import Badge from '@mui/material/Badge';
import axios from 'axios'
import { baseUrl } from '../Url';
function Account(){
    const [count,setCount] = useState(0)
    const [toggle,setToggle]= useState(true);
    const navigate = useNavigate();
    const handleClick = () =>{
        toggle?navigate('./resetpassword'):navigate('./')
        setToggle(!toggle);
    }

    async function Request() {
        try {
          axios.defaults.headers.common['Authorization'] = `Basic ${localStorage.getItem('TOKEN')}` ; 
          const result = await axios.get(baseUrl+"resetpassword")
          setCount(result.data.length)
        } catch (error) {
          console.error(error);
        }
    }

    useEffect(()=>Request(),[])
    useEffect(()=>Request(),[toggle])


    return <div className="account">
    {toggle?
    <Badge badgeContent={count} color="secondary">
    <Button onClick={handleClick} className="button-tog">Cấp lại mật khẩu</Button>
    </Badge>:
    <Button onClick={handleClick} className="button-tog">Tài khoản</Button>
    }
    
    <Outlet/>
    </div>



}

export default Account