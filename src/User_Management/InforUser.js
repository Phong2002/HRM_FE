import { useState } from 'react'
import './InforUser.css'
import { RiCloseCircleLine } from 'react-icons/ri'
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Alert } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../Url'
import IconFix from '../IconFix.js'
import axios from 'axios'


function InforUser(props) {

  const toastSuccess = () => toast.success('Cập nhật thành công', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });;

  const toastFail = () => toast.error('Cập nhật thất bại', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const [department, setDepartment] = useState()
  async function DataDepartment() {
    try {
      axios.defaults.headers.common['Authorization'] = `Basic ${localStorage.getItem('TOKEN')}`;
      const result = await axios.get(baseUrl + "departments")
      setDepartment(result.data)
    } catch (error) {
      console.error(error);
    }
  }

  useState(() => DataDepartment(), [])

  const [firstName, setFirstName] = useState(props.data.firstname);
  const [toggleFirstName, setToggleFirstName] = useState(false);
  const [lastName, setLastName] = useState(props.data.lastname);
  const [toggleLastName, setToggleLastName] = useState(false);
  const [gender, setGender] = useState(props.data.gender);
  const [toggleGender, setToggleGender] = useState(false)
  const [birth, setBirth] = useState(props.data.dateOfBirth);
  const [toggleBirth, setToggleBirth] = useState(false)
  const [address, setAddress] = useState(props.data.address);
  const [toggleAddress, setToggleAddress] = useState(false)
  const [email, setEmail] = useState(props.data.email);
  const [toggleEmail, setToggleEmail] = useState(false)
  const [workStartDate, setWorkStartDate] = useState(props.data.workStartDate)
  const [toggleWorkStartDate, setToggleWorkStartDate] = useState(false)
  const [numberPhone, setNumberPhone] = useState(props.data.numberPhone);
  const [toggleNumberPhone, setToggleNumberPhone] = useState(false)
  const [salary, setSalary] = useState(props.data.salary);
  const [toggleSalary, setToggleSalary] = useState(false);
  const [idCard, setIdCard] = useState(props.data.idCard);
  const [toggleIdCard, setToggleIdCard] = useState(false)
  const [departmentName, setDepartmentName] = useState(props.data.department ? props.data.department.name : "Không tồn tại");
  const [toggleDepartmentName, setToggleDepartmentName] = useState(false);
  const [departmentId, setDepartmentId] = useState(props.data.department ? props.data.department.id : "");
  const [classify, setClassify] = useState(props.data.classify);
  const [toggleClassify, setToggleClassify] = useState(false)



  const [toggleOn, setToggleOn] = useState(false);
  async function UpdateData() {

    var axios = require('axios');
    var data = JSON.stringify({
      "firstname": firstName,
      "lastname": lastName,
      "gender": gender,
      "dateOfBirth": birth,
      "address": address,
      "email": email,
      "workStartDate": workStartDate,
      "numberPhone": numberPhone,
      "salary": salary,
      "idCard": idCard,
      "departmentId": departmentId,
      "classify": classify,
    });

    var config = {
      method: 'put',
      url: `${baseUrl}users/${props.data.id}`,
      headers: {
        'Authorization': `Basic ${localStorage.getItem("TOKEN")}`,
        'Content-Type': 'application/json',

      },
      data: data
    };

    axios(config)
      .then(function (response) {
        setToggleOn(false);
        toastSuccess();
        props.resetData();
      })
      .catch(function (error) {
        setToggleOn(false);
        toastFail();
      });

  }

  const handleCloseModal = () => {
    props.closeModal();
  }

  return <>
    <div className="Infor-container"  >
      <div ><RiCloseCircleLine className="button-close" onClick={handleCloseModal} /></div>
      <div className="Infor-col-1">
        <img className="Infor-Avatar" src="http://placeimg.com/640/480/animals"></img>
        <p className="Infor-Name">{props.data.firstname + " " + props.data.lastname}</p>
        <p className="Infor-Name">{props.data.department ? props.data.department.name : "Chưa có phòng ban"}</p>
        <p className="Infor-Name">{props.data.address}</p>
      </div>

      <div className="Infor-col-2">
        <ul className="col-inf">
          <li className="block">
            <label htmlFor="firstname" className="label-profile">Họ và tên đệm</label>
            {toggleFirstName ? <input type="text" id="firstname" className="input-profile" value={firstName} onChange={e => setFirstName(e.target.value)} required /> : <p className="content-input">{firstName}</p>}
            <IconFix toggle={toggleFirstName} setToggle={setToggleFirstName} />
          </li>

          <li className="block">
            <label htmlFor="lastname" className="label-profile">Tên</label>
            {toggleLastName ? <input type="text" id="lastname" className="input-profile" value={lastName} onChange={e => setLastName(e.target.value)} required /> : <p className="content-input">{lastName}</p>}
            <IconFix toggle={toggleLastName} setToggle={setToggleLastName} />
          </li>

          <li className="block">
            <label htmlFor="gender" className="label-profile" >Giới tính</label>
            {toggleGender ? <select id="gender" className="input-profile" value={gender} onChange={e => setGender(e.target.value)} required>
                    <option value="nam">Nam</option>
                    <option value="nữ">Nữ</option>
                    <option value="khác">Khác</option>
                </select> : <p className="content-input">{gender}</p>}
            <IconFix toggle={toggleGender} setToggle={setToggleGender} />
          </li>

          <li className="block">
            <label className="label-profile" htmlFor="birth">Ngày sinh</label>
            {!toggleBirth ? <p className="content-input">{birth}</p> : <input type="date" id="birth" className="input-profile" value={birth} onChange={e => setBirth(e.target.value)} required />}
            <IconFix toggle={toggleBirth} setToggle={setToggleBirth} />
          </li>

          <li className="block">
            <label className="label-profile" htmlFor="address">Địa chỉ</label>
            {!toggleAddress ? <p className="content-input">{address}</p> : <input type="text" id="address" className="input-profile" value={address} onChange={e => setAddress(e.target.value)} required />}
            <IconFix toggle={toggleAddress} setToggle={setToggleAddress} />
          </li>

          <li className="block">
            <label className="label-profile" htmlFor="email">Email</label>
            {!toggleEmail ? <p className="content-input">{email}</p> : <input type="text" id="email" className="input-profile" value={email} onChange={e => setEmail(e.target.value)} required />}
            <IconFix toggle={toggleEmail} setToggle={setToggleEmail} />
          </li>

          <li className="block">
            <label className="label-profile" htmlFor="workStartDate">Ngày bắt đầu làm việc</label>
            {!toggleWorkStartDate ? <p className="content-input">{workStartDate}</p> : <input type="date" id="workStartDate" className="input-profile" value={workStartDate} />}
            <IconFix toggle={toggleWorkStartDate} setToggle={setToggleWorkStartDate} />

          </li>

          <li className="block">
            <label className="label-profile" htmlFor="numberPhone">Số điện thoại</label>
            {!toggleNumberPhone ? <p className="content-input">{numberPhone}</p> : <input type="text" id="numberPhone" className="input-profile" value={numberPhone} onChange={e => setNumberPhone(e.target.value)} required />}
            <IconFix toggle={toggleNumberPhone} setToggle={setToggleNumberPhone} />
          </li>

          <li className="block">
            <label className="label-profile" htmlFor="salary">Lương cơ bản</label>
            {!toggleSalary ? <p className="content-input">{salary}</p> : <input type="text" id="salary" className="input-profile" value={salary} onChange={e => setSalary(e.target.value)} required/>}
            <IconFix toggle={toggleSalary} setToggle={setToggleSalary} />
          </li>

          <li className="block">
            <label className="label-profile" htmlFor="idCard">Số căn cước</label>
            {!toggleIdCard ? <p className="content-input">{idCard}</p> : <input type="text" id="idCard" className="input-profile" value={idCard} onChange={e => setIdCard(e.target.value)} required />}
            <IconFix toggle={toggleIdCard} setToggle={setToggleIdCard} />
          </li>

          <li className="block">
            <label className="label-profile" htmlFor="department">Phòng ban</label>
            {!toggleDepartmentName ?
              <p className="content-input">{departmentName}</p> :
              <select id="departments" className="input-profile" onChange={e => setDepartmentId(e.target.value)}>
                {department.map((value, index) => <option value={value.departmentId}>{value.name}</option>)}
              </select>}
            <IconFix toggle={toggleDepartmentName} setToggle={setToggleDepartmentName} />
          </li>


          <li className="block">
            <label className="label-profile" htmlFor="classify">Loại hợp đồng</label>
            {!toggleClassify ?
              <p className="content-input">{classify}</p> :
              <select id="classify" className="input-profile" onChange={e => setClassify(e.target.value)}>
                <option value="chính thức">chính thức</option>
                <option value="không chính thức">không chính thức</option>
                <option value="thời vụ">thời vụ</option>
                <option value="cộng tác viên">cộng tác viên</option>
              </select>}
            <IconFix toggle={toggleClassify} setToggle={setToggleClassify} />
          </li>

        </ul>

        <Button
          color="info"
          onClick={() => { setToggleOn(!toggleOn) }}>
          Cập nhật thông tin
        </Button>
      </div>


      <Modal
        isOpen={toggleOn}
        size="sm"
      >
        <ModalHeader  >
          Cập nhật thông tin
        </ModalHeader>
        <ModalBody>
          Bạn có chắc chắn muốn cập nhật thông tin mới cho {firstName + " " + lastName}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={UpdateData}
          >
            Cập nhật
          </Button>
          {' '}
          <Button onClick={() => { setToggleOn(false) }}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={2000}
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
  </>
}

export default InforUser
