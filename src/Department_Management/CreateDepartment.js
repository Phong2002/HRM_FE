import { useState } from "react";
import {RiCloseCircleLine} from 'react-icons/ri'
import { Button ,Modal,ModalHeader,ModalFooter,ModalBody,Alert} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import {baseUrl} from '../Url'
function CreateDepartment(props){

    const [toggleOn,setToggleOn] = useState(false);

    const toastSuccess = () => toast.success('Tạo thành công phòng ban '+name, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });;

    const toastFail = () => toast.error('Tạo thất bại phòng ban '+name, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

    const [id,setId] = useState("");
    const [name,setName] = useState("");
    const [introduce,setIntroduce] = useState("");
    const [foundingDate,setFoundingDate] = useState();


    async function UpdateData() {
      
        var axios = require('axios');
        var data = JSON.stringify({
          "name": name,
          "introduce": introduce,
          "foundingDate": foundingDate,
        });
        
        var config = {
          method: 'post',
          url: `${baseUrl}departments`,
          headers: { 
            'Authorization': `Basic ${localStorage.getItem("TOKEN")}`, 
            'Content-Type': 'application/json', 

          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
          setToggleOn(false);
          toastSuccess();
            props.resetData()
        })
        .catch(function (error) {
            setToggleOn(false);
            toastFail();
        });
       
      }

    return <div className="dep">
        <div className="close" onClick={props.closeModal}><RiCloseCircleLine/></div>
        <ul >

            <li className="">
                <label htmlFor="name" className="label-profile">Tên phòng ban</label>
                <input type="text" id="name" className="input-profile" value={name} onChange={(e)=>{setName(e.target.value)}} required/>
            </li>

            <li className="">
                <label htmlFor="introduce" className="label-profile">Giới thiệu</label>
                <textarea name="introduce" className="intro-input input-profile" value={introduce} onChange={(e)=>{setIntroduce(e.target.value)}} required/>    
            </li>

            <li className="">
                <label htmlFor="foundingDate" className="label-profile">Ngày thành lập</label>
                <input type="date" id="foundingDate" className="input-profile" value={foundingDate} onChange={(e)=>{setFoundingDate(e.target.value)}}required/>
            </li>
        </ul>

        <Button
            color="success"
            onClick={()=>{setToggleOn(!toggleOn)}}>
            Tạo phòng ban
            </Button> 
    


  <Modal
    isOpen={toggleOn}
    size="sm"
  >
    <ModalHeader isOpen={toggleOn} >
     Tạo phòng ban
    </ModalHeader>
    <ModalBody>
        Bạn có chắc chắn muốn tạo phòng ban {name}
    </ModalBody>
    <ModalFooter>
      <Button
        color="primary"
        onClick={UpdateData}
      >
        Tạo phòng ban

      </Button>
      {' '}
      <Button onClick={()=>{setToggleOn(false)}}>
        Cancel
      </Button>
    </ModalFooter>
  </Modal>
  <div>
      </div>

    </div>
}

export default CreateDepartment;