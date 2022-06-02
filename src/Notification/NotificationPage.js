import { useEffect, useState } from 'react';
import {baseUrl} from '../Url';
import axios from 'axios'
import NotificationList from './NotificationList.js'
import { ToastContainer, toast } from 'react-toastify';
import {Button,Modal,ModalHeader,ModalFooter,ModalBody} from 'reactstrap'
import {BsSearch} from 'react-icons/bs'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
function Notification(){

    const toastSuccess = () => toast.success('Gửi thông báo thành công', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });;

    const toastFail = () => toast.error('Gửi thông báo thất bại', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

const [data,setData] = useState([]);
const [modalSendToDepartment,setModalSendToDepartment] = useState();
const [modalSendToUser,setModalSendToUser] = useState();

const [content,setContent] = useState("");
const [department,setDepartment] = useState([]);
const [departmentId,setDepartmentId] = useState();
const [email,setEmail] = useState("");
const [subject,setSubject] = useState("");
const [title,setTitle] = useState("");
const [contentToUser,setContentToUser] = useState("")


// filter 

const [paging,setPaging] = useState(1);


const [totalPages,setTotalPages] = useState(0);

const [search, setSearch] = useState();

const [sortBy,setSortBy]= useState("");

const [typeSort,setTypeSort] = useState("");

const [fDepartments,setFDepartments] = useState("");

const Specification  = ()=>{
  let specification = "";
  specification += (search ? (specification ? "&" : "?") + "search=" + search : "");
  specification += (fDepartments ? (specification ? "&" : "?") + "departmentId=" + fDepartments : "");
  specification += (paging ? (specification ? "&" : "?") + "page=" + paging +"&size=5" : "");
  specification += (sortBy ? (specification ? "&" : "?") + "sort="+ sortBy+(typeSort?","+typeSort:""):(specification ? "&" : "?")+"sort=notifyId,desc")
  return specification;
}


async function getData() {
    try {
      axios.defaults.headers.common['Authorization'] = `Basic ${localStorage.getItem('TOKEN')}` ; 
      const result = await axios.get(baseUrl+"notifications"+Specification())
      
       const resultx = result.data;
       setData(resultx.content)
       setTotalPages(resultx.totalPages)
    } catch (error) {
      console.error(error);
    }
}

async function getDepartment() {
    try {
      axios.defaults.headers.common['Authorization'] = `Basic ${localStorage.getItem('TOKEN')}` ; 
      const result = await axios.get(baseUrl+"departments")
      
       const resultx = result.data;
       setDepartment(resultx.content)
       setDepartmentId(resultx.content[0].id)
    } catch (error) {
      console.error(error);
    }
}

async function sendNotiToDept() {
      
    var axios = require('axios');
    var data = JSON.stringify({
      
      "content": content,
      "title":title,
      "departmentId": departmentId,
    });
    
    var config = {
      method: 'post',
      url: `${baseUrl}notifications`,
      headers: { 
        'Authorization': `Basic ${localStorage.getItem("TOKEN")}`, 
        'Content-Type': 'application/json', 

      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      toastSuccess();
        getData();
        
    })
    .catch(function (error) {
    
        toastFail();
    });
   
  }

  async function sendNotiToUser() {
      
    var axios = require('axios');
    var data = JSON.stringify({
      
      "content": content,
      "subject": subject,
      "email":email
    });
    
    var config = {
      method: 'post',
      url: `${baseUrl}notifications/sendemail`,
      headers: { 
        'Authorization': `Basic ${localStorage.getItem("TOKEN")}`, 
        'Content-Type': 'application/json', 

      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      toastSuccess();
        getData();
        
    })
    .catch(function (error) {
    
        toastFail();
    });
   
  }

    useEffect(()=>{getData()},[])
    useEffect(()=>{getData()},[paging])
    useEffect(()=>{getData()},[fDepartments])
    useEffect(()=>{getData()},[sortBy])
    useEffect(()=>{getData()},[typeSort])
    useEffect(()=>{getDepartment()},[])
    

    return <div className="dep-ful">
     <div className="row-tool">
      <div className="input-search" >
      <input type="search" placeholder="Tìm kiếm ..." onChange={e => setSearch(e.target.value)} /><button><BsSearch onClick={() => {getData();setPaging(1)}} /></button>
      </div>

      <div className="classify">
        <FormControl sx={{ m:-1, minWidth: 200 }} style={{ margin:"10px 0"}} size="small">
      <InputLabel id="department" style={{ zIndex:-1}}>Phòng ban</InputLabel>
      <Select
        labelId="department"
        id="department"
        value={fDepartments}
        label="phong ban "
        onChange={e=>{setFDepartments(e.target.value);setPaging(1);setTypeSort("")}}
      >
        <MenuItem value="">
          <em>Mặc định</em>
        </MenuItem>
        {department.map((value,index)=><MenuItem key={value.id} value={value.id}>{value.name}</MenuItem>)}  
      </Select>
    </FormControl>
      </div>

      <div className="classify">
        <FormControl sx={{ m:-1, minWidth: 200 }} style={{ margin:"10px 0"}} size="small">
      <InputLabel id="sortby" style={{ zIndex:-1}}>Sắp xếp theo</InputLabel>
      <Select
        labelId="sortby"
        id="sortby"
        value={sortBy}
        label="sap xep theo "
        onChange={e=>{setSortBy(e.target.value);setPaging(1);setTypeSort("")}}
      >
        <MenuItem value="">
          <em>Mặc định</em>
        </MenuItem>
        <MenuItem value='sentdate'>Ngày / Giờ gửi</MenuItem>
        <MenuItem value='title'>Tiêu đề</MenuItem>
      </Select>
    </FormControl>
      </div>
      <div className="classify">
        <FormControl sx={{ m:-1, minWidth: 150 }} style={{ margin:"10px 0"}} size="small">
      <InputLabel id="typesort" style={{ zIndex:-1}}>Theo thứ tự</InputLabel>
      <Select
        labelId="typesort"
        id="typesort"
        value={typeSort}
        label=" theo thu tu "
        onChange={e=>{setTypeSort(e.target.value);setPaging(1)}}
      > 
        
        <MenuItem value='asc'>Tăng dần</MenuItem>
        <MenuItem value='desc'>Giảm dần</MenuItem>
      </Select>
    </FormControl>
    </div>

    <div>
      <div className="col-20">
        <Button className=" button" color="success" onClick={()=>{setModalSendToDepartment(true)}}>Gửi thông báo đến phòng ban</Button>
        <Button className=" button" color="success" onClick={()=>{setModalSendToUser(true)}}>Gửi thông báo đến cá nhân</Button>
      </div>
      <div className="col-80 table col-ful">
      <table className="col-full table">
         <thead>
          <tr>  
              <th style={{width:"130px"}}>Mã thông báo</th>
              <th style={{width:"130px"}}>Nơi nhận</th>
              <th style={{width:"130px"}}>Ngày / Giờ gửi</th>
              <th style={{width:"300px"}}>Tiêu đề</th>
              <th>Nội dung</th>
          </tr>
         </thead>
          <tbody>
          {data.map(data=><NotificationList key={data.notifyId} id={data.notifyId} departmentName={(data.department===null) ?"Phong ban da bi xoa": data.department.name } sentdate={data.sentdate} content={data.content} title={data.title}/>
         )}
         
        </tbody>
      </table>
      <div className="pagination">
    <Pagination count={totalPages}  showFirstButton showLastButton onChange={(e,v) => {setPaging(v)}} variant="outlined" color="primary"/>
    </div>
   
      <Modal
    isOpen={modalSendToDepartment} toggle ={()=>{setModalSendToDepartment(false)}}
    size="lg"
  >
    <ModalHeader  >
     Gửi thông báo đến phòng ban
    </ModalHeader>
    <ModalBody>
        <label htmlFor="department" className="label-profile" >Phòng ban</label>
        <select name="department" id = "department" className="input-profile" onChange={(e)=>{setDepartmentId(e.target.value)}}>
            {department.map(value =><option value={value.id} key={value.id}>{value.name}</option>)}
        </select>
        <label htmlFor="title" className="label-profile" >Tiêu đề</label>
        <input type="title" id="title" className="input-profile" onChange={(e)=>{setTitle(e.target.value)}}/>
        <label htmlFor="content" className="label-profile">Nội dung</label>
        <textarea id="content" className="input-profile intro-input" onChange={(e)=>{setContent(e.target.value)}} />
    </ModalBody>
    <ModalFooter>
      <Button
        color="primary"
        onClick={()=>{sendNotiToDept()}}
      >
        Gửi

      </Button>
      {' '}
      <Button onClick={()=>{setModalSendToDepartment(false)}}>
        Cancel
      </Button>
    </ModalFooter>
  </Modal>


  <Modal
    isOpen={modalSendToUser} toggle ={()=>{setModalSendToUser(false)}}
    size="lg"
  >
    <ModalHeader  >
     Gửi thông báo đến nhân viên
    </ModalHeader>
    <ModalBody>
        <label htmlFor="email" className="label-profile" >Email</label>
        <input type="email" id="email" className="input-profile" onChange={(e)=>{setEmail(e.target.value)}}/>
        <label htmlFor="subject" className="label-profile" >Tiêu đề</label>
        <input type="email" id="subject" className="input-profile" onChange={(e)=>{setSubject(e.target.value)}}/>
        <label htmlFor="content" className="label-profile">Nội dung</label>
        <textarea id="content" className="input-profile intro-input" onChange={(e)=>{setContent(e.target.value)}} />
    </ModalBody>
    <ModalFooter>
      <Button
        color="primary"
        onClick={()=>{sendNotiToUser()}}
      >
        Gửi

      </Button>
      {' '}
      <Button onClick={()=>{setModalSendToUser(false)}}>
        Cancel
      </Button>
    </ModalFooter>
  </Modal>

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
  </div>
  </div>
}


export default Notification;
