import {Link,Outlet, useNavigate} from 'react-router-dom';
import './Home.css'
import {GiExitDoor} from 'react-icons/gi';
import { Button ,Modal,ModalHeader,ModalFooter,ModalBody,Alert} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react'

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';



function HomeAdmin(){

const navigate = useNavigate();
const [toggleOn,setToggleOn] = useState(false);


const handleLogOut=()=>{
    setToggleOn(false);
    localStorage.clear()
    navigate("../login")
}

const [value, setValue] = useState("");
const handleChange = (event, newValue) => {
  setValue(newValue);
  navigate("./"+newValue);
};


    return <div style={{height:"100%"}}>
    <div className="head-nav">
    <Box className="nav">
      <Tabs
        
      TabIndicatorProps={{style: {background:'rgb(0, 255, 153)',height: 3}}}
      classes={{ indicator: `black` }}
        value={value}
        onChange={handleChange}
        textColor="secondary"
        className="dashboard-tabs"
        aria-label="secondary tabs example"
      >
        <Tab value="" label="Trang chủ" />
        <Tab value="profile" label="Hồ sơ" />
        <Tab value="salary" label="Lương thưởng" />
        <Tab value="notify" label="Thông báo" />
      </Tabs>
    </Box>
        

            <div className="logout" onClick={()=>{setToggleOn(true)}}>Đăng xuất <GiExitDoor/></div>
            </div>

        <Modal
            isOpen={toggleOn}
            size="sm"
        >
            <ModalHeader isOpen={toggleOn} >
            Đăng xuất
            </ModalHeader >
            <ModalBody>
            Bạn có chắc chắn muốn đăng xuất ?
            </ModalBody>
            <ModalFooter>
            <Button
            color="primary"
            onClick={handleLogOut}
            >
            Đăng xuất
            </Button>
             {' '}
            <Button onClick={()=>{setToggleOn(false)}}>
            Không
            </Button>
            </ModalFooter>
        </Modal>
       <Outlet/>
    </div>
}

export default HomeAdmin