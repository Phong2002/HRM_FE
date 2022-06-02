import { useState } from "react";
import {RiCloseCircleLine} from 'react-icons/ri'
import { Button ,Modal,ModalHeader,ModalFooter,ModalBody,Alert} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import {baseUrl} from '../Url'
function Department(props){

    const [toggleOn,setToggleOn] = useState(false);

    const toastSuccess = () => toast.success('Cập nhật thành công', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });;

    const toastFail = () => toast.error('Cập nhật thất bại', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });


    const [name,setName] = useState(props.data.name);
    const [introduce,setIntroduce] = useState(props.data.introduce);
    const [foundingDate,setFoundingDate] = useState(props.data.foundingDate);


    async function UpdateData() {
      
        var axios = require('axios');
        var data = JSON.stringify({
          "name": name,
          "introduce": introduce,
          "foundingDate": foundingDate,
        });
        
        var config = {
          method: 'put',
          url: `${baseUrl}departments/${props.data.id}`,
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
                <input type="text" id="name" className="input-profile" value={name} onChange={(e)=>{setName(e.target.value)}}/>
            </li>

            <li className="">
                <label htmlFor="introduce" className="label-profile">Giới thiệu</label>
                <textarea name="introduce" className="intro-input input-profile" value={introduce} onChange={(e)=>{setIntroduce(e.target.value)}}/>    
            </li>

            <li className="">
                <label htmlFor="foundingDate" className="label-profile">Ngày thành lập</label>
                <input type="date" id="foundingDate" className="input-profile" value={foundingDate} onChange={(e)=>{setFoundingDate(e.target.value)}}/>
            </li>
        </ul>

        <Button
            color="success"
            onClick={()=>{setToggleOn(!toggleOn)}}>
            Cập nhật thông tin
            </Button> 
    


  <Modal
    isOpen={toggleOn}
    size="sm"
  >
    <ModalHeader isOpen={toggleOn} >
     Cập nhật thông tin
    </ModalHeader>
    <ModalBody>
        Bạn có chắc chắn muốn cập nhật thông tin mới cho phòng ban {name}
    </ModalBody>
    <ModalFooter>
      <Button
        color="primary"
        onClick={UpdateData}
      >
        Cập nhật

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

export default Department;