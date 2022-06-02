import { useEffect, useState } from "react";
import { RiCloseCircleLine } from 'react-icons/ri'
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Alert } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import { baseUrl } from '../Url'
import axios from 'axios';
function CreateUser(props) {

    const [toggleOn, setToggleOn] = useState(false);

    const toastSuccess = () => toast.success('Tạo thành công nhân viên' + firstName + ' ' + lastName, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });;

    const toastFail = () => toast.error('Tạo thất bại nhân viên' + firstName + ' ' + lastName, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [gender, setGender] = useState("nam");
    const [birth, setBirth] = useState();
    const [address, setAddress] = useState();
    const [email, setEmail] = useState();
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [workStartDate, setWorkStartDate] = useState()
    const [numberPhone, setNumberPhone] = useState();
    const [salary, setSalary] = useState();
    const [idCard, setIdCard] = useState();
    const [departmentId, setDepartmentId] = useState();
    const [classify, setClassify] = useState("chính thức");
    const [department, setDepartment] = useState([])

    async function DataDepartment() {
        try {
            axios.defaults.headers.common['Authorization'] = `Basic ${localStorage.getItem('TOKEN')}`;
            const result = await axios.get(baseUrl + "departments")
            setDepartment(result.data.content)
            setDepartmentId(result.data.content[0].id)
        } catch (error) {
            console.error(error);
        }
    }

    async function Create() {

        var axios = require('axios');
        var data = JSON.stringify({
            "firstname": firstName,
            "lastname": lastName,
            "gender": gender,
            "dateOfBirth": birth,
            "address": address,
            "email": email,
            "username": username,
            "password": password,
            "workStartDate": workStartDate,
            "numberPhone": numberPhone,
            "salary": salary,
            "idCard": idCard,
            "departmentId": departmentId,
            "classify": classify,
        });

        var config = {
            method: 'post',
            url: `${baseUrl}users`,
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
                toastFail()
            });

    }

    useEffect((() => DataDepartment()), [])

    return <div style={{ textAlign: 'center' }}>
        <ul >
            <li className="block">
                <label htmlFor="firstname" className="label-profile">Họ và tên đệm</label>
                <input type="text" id="firstname" className="input-profile" value={firstName} onChange={e => setFirstName(e.target.value)} required />
            </li>

            <li className="block">
                <label htmlFor="lastname" className="label-profile">Tên</label>
                <input type="text" id="lastname" className="input-profile" value={lastName} onChange={e => setLastName(e.target.value)} required />
            </li>

            <li className="block">
                <label htmlFor="gender" className="label-profile" >Giới tính</label>
                <select id="gender" className="input-profile" value={gender} onChange={e => setGender(e.target.value)} required>
                    <option value="nam">Nam</option>
                    <option value="nữ">Nữ</option>
                    <option value="khác">Khác</option>
                </select>
            </li>

            <li className="block">
                <label className="label-profile" htmlFor="birth">Ngày sinh</label>
                <input type="date" id="birth" className="input-profile" value={birth} onChange={e => setBirth(e.target.value)} required />
            </li>

            <li className="block">
                <label className="label-profile" htmlFor="address">Địa chỉ</label>
                <input type="text" id="address" className="input-profile" value={address} onChange={e => setAddress(e.target.value)} required />
            </li>

            <li className="block">
                <label className="label-profile" htmlFor="email">Email</label>
                <input type="text" id="email" className="input-profile" value={email} onChange={e => setEmail(e.target.value)} required />
            </li>

            <li className="block">
                <label className="label-profile" htmlFor="username">Tài khoản</label>
                <input type="text" id="username" className="input-profile" value={username} onChange={e => setUsername(e.target.value)} required />
            </li>

            <li className="block">
                <label className="label-profile" htmlFor="password">Mật khẩu</label>
                <input type="text" id="password" className="input-profile" value={password} onChange={e => setPassword(e.target.value)} required />
            </li>

            <li className="block">
                <label className="label-profile" htmlFor="workStartDate">Ngày bắt đầu làm việc</label>
                <input type="date" id="workStartDate" className="input-profile" value={workStartDate} />

            </li>

            <li className="block">
                <label className="label-profile" htmlFor="numberPhone">Số điện thoại</label>
                <input type="text" id="numberPhone" className="input-profile" value={numberPhone} onChange={e => setNumberPhone(e.target.value)} required />
            </li>

            <li className="block">
                <label className="label-profile" htmlFor="salary">Lương cơ bản</label>
                <input type="text" id="salary" className="input-profile" value={salary} onChange={e => setSalary(e.target.value)} required />
            </li>

            <li className="block">
                <label className="label-profile" htmlFor="idCard">Số căn cước</label>
                <input type="text" id="idCard" className="input-profile" value={idCard} onChange={e => setIdCard(e.target.value)} required />
            </li>

            <li className="block">
                <label className="label-profile" htmlFor="department">Phòng ban</label>
                <select id="departments" className="input-profile" value={departmentId} onChange={e => { setDepartmentId(e.target.value); }}>
                    {department.map((value, index) => <option value={value.id}>{value.name}</option>)}
                </select>
            </li>

            <li className="block">
                <label className="label-profile" htmlFor="classify">Loại hợp đồng</label>
                <select id="classify" className="input-profile" value={classify} onChange={e => setClassify(e.target.value)}>
                    <option value="chính thức">chính thức</option>
                    <option value="không chính thức">không chính thức</option>
                    <option value="thời vụ">thời vụ</option>
                    <option value="cộng tác viên">cộng tác viên</option>
                </select>
            </li>

        </ul>

        <Button
            color="success"
            onClick={() => { setToggleOn(!toggleOn) }} >
            Tạo tài khoản
        </Button>



        <Modal
            isOpen={toggleOn}
            size="sm"
            toggle={() => { setToggleOn(false) }}
        >
            <ModalHeader isOpen={toggleOn} toggle={() => { setToggleOn(false) }} >
                Tạo tài khoản
            </ModalHeader>
            <ModalBody>
                Bạn có chắc chắn muốn tạo tài khoản cho {(firstName ? firstName : "") + " " + (lastName ? lastName : "")}
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={Create}
                >
                    Tạo phòng ban

                </Button>
                {' '}
                <Button onClick={() => { setToggleOn(false) }}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
        <div>
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

}

export default CreateUser;