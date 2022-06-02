import { useState, useEffect } from 'react'
import IconFix from './IconFix';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Alert } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { baseUrl } from './Url'


function ProfileEmployee(props) {



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




    async function fetchData() {
        try {
            axios.defaults.headers.common['Authorization'] = `Basic ${localStorage.getItem('TOKEN')}`;
            const result = await axios.get(baseUrl + "users/profile/" + localStorage.getItem('ID'))

            setFirstName(result.data.firstname)
            setLastName(result.data.lastname)
            setGender(result.data.gender)
            setBirth(result.data.dateOfBirth)
            setAddress(result.data.address)
            setEmail(result.data.email)
            setWorkStartDate(result.data.workStartDate)
            setNumberPhone(result.data.numberPhone)
            setSalary(result.data.salary)
            setIdCard(result.data.idCard)
            setDepartmentName(result.data.departmentName)
            setDepartmentId(result.data.departmentId)
            setClassify(result.data.classify)

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => fetchData(), [])

    const [firstName, setFirstName] = useState();
    const [toggleFirstName, setToggleFirstName] = useState(false);
    const [lastName, setLastName] = useState();
    const [toggleLastName, setToggleLastName] = useState(false);
    const [gender, setGender] = useState();
    const [toggleGender, setToggleGender] = useState(false)
    const [birth, setBirth] = useState();
    const [toggleBirth, setToggleBirth] = useState(false)
    const [address, setAddress] = useState();
    const [toggleAddress, setToggleAddress] = useState(false)
    const [email, setEmail] = useState();
    const [toggleEmail, setToggleEmail] = useState(false)
    const [workStartDate, setWorkStartDate] = useState()
    const [numberPhone, setNumberPhone] = useState();
    const [toggleNumberPhone, setToggleNumberPhone] = useState(false)
    const [salary, setSalary] = useState();
    const [idCard, setIdCard] = useState();
    const [toggleIdCard, setToggleIdCard] = useState(false)
    const [departmentName, setDepartmentName] = useState();
    const [departmentId, setDepartmentId] = useState();
    const [classify, setClassify] = useState();


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
            url: `${baseUrl}users/${localStorage.getItem('ID')}`,
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

            })
            .catch(function (error) {
                setToggleOn(false);
                toastFail();
            });

    }



    return <>
        <div className="Infor-container">
            <div className="Infor-col-1">
                <img className="Infor-Avatar" src="http://placeimg.com/640/480/animals"></img>
                <p className="Infor-Name">{firstName + " " + lastName}</p>
                <p className="Infor-Name">{departmentName}</p>
                <p className="Infor-Name">{address}</p>
            </div>

            <div className="Infor-col-2">
                <ul className="col-inf">
                    <li className="block">
                        <label htmlFor="firstname" className="label-profile">Họ</label>
                        {toggleFirstName ? <input type="text" id="firstname" className="input-profile" value={firstName} onChange={e => setFirstName(e.target.value)} required /> : <p className="content-input">{firstName}</p>}
                        <IconFix toggle={toggleFirstName} setToggle={setToggleFirstName} />
                    </li>

                    <li className="block">
                        <label htmlFor="lastname" className="label-profile">Tên đệm và tên</label>
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
                        <p className="content-input">{workStartDate}</p>
                    </li>

                    <li className="block">
                        <label className="label-profile" htmlFor="numberPhone">Số điện thoại</label>
                        {!toggleNumberPhone ? <p className="content-input">{numberPhone}</p> : <input type="text" id="numberPhone" className="input-profile" value={numberPhone} onChange={e => setNumberPhone(e.target.value)} required />}
                        <IconFix toggle={toggleNumberPhone} setToggle={setToggleNumberPhone} />
                    </li>

                    <li className="block">
                        <label className="label-profile" htmlFor="salary">Lương cơ bản</label>
                        <p className="content-input">{salary}</p>
                    </li>

                    <li className="block">
                        <label className="label-profile" htmlFor="idCard">Số căn cước</label>
                        {!toggleIdCard ? <p className="content-input">{idCard}</p> : <input type="text" id="idCard" className="input-profile" value={idCard} onChange={e => setIdCard(e.target.value)} required />}
                        <IconFix toggle={toggleIdCard} setToggle={setToggleIdCard} />
                    </li>

                    <li className="block">
                        <label className="label-profile" htmlFor="department">Mã phòng ban</label>
                        <p className="content-input">{departmentName}</p>
                    </li>


                    <li className="block">
                        <label className="label-profile" htmlFor="classify">Loại hợp đồng</label>
                        <p className="content-input">{classify}</p>
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
                    Bạn có chắc chắn muốn cập nhật thông tin mới !
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
    </>
}

export default ProfileEmployee
