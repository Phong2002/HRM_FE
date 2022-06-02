import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../Url';
import Pagination from '@mui/material/Pagination';
import SalaryUser from './SalaryUser.js'
import Payroll from './Payroll.js'
import { BsSearch } from 'react-icons/bs'
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FaFilter } from 'react-icons/fa'
import { RiFilterOffFill } from 'react-icons/ri'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import viLocale from 'date-fns/locale/vi';
import { ToastContainer, toast } from 'react-toastify';

import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextareaAutosize from "@mui/material/TextareaAutosize";



function SalaryPage() {

    const toastSuccess = (mess) => toast.success(mess, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });;

    const toastFail = (mess) => toast.error(mess, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const [search, setSearch] = useState("");
    const [data, setData] = useState([])
    const [totalPages, setTotalPages] = useState(0);
    const [paging, setPaging] = useState(1);
    const [openModal, setOpenModal] = useState(false);
    const [startDate, setStartDate] = useState("")
    const [dateEnd, setDateEnd] = useState("")
    const [resetFilter, setResetFilter] = useState(true);
    const [modalCreateTimekeeping, setModalCreateTimekeeping] = useState(false)

    const [month, setMonth] = useState()
    const [year, setYear] = useState()
    const [userId, setUserId] = useState()
    const [fullName, setFullName] = useState()
    const [departmentName, setDepartmentName] = useState()

    //create Timekeeping 
    const [createStartTime, setCreateStartTime] = useState("08:15:00")
    const [createEndTime, setCreateEndTime] = useState("")
    const [createDay, setCreateDay] = useState("")
    const [createUserId, setCreateUserId] = useState("")

    //create RewardPunish
    const [RPUserId, setRPUserId] = useState("")
    const [RPamount, setRPAmount] = useState();
    const [createRewardPunish, setCreateRewardPunish] = useState(false);
    const [RPDay, setRPDay] = useState("");
    const [RPReason, setRPReason] = useState("");


    const Specification = () => {
        let specification = ""
        specification += (paging ? (specification ? "&" : "?") + "page=" + paging + "&size=8" : "");
        specification += (search ? (specification ? "&" : "?") + "search=" + search : "");
        specification += (startDate ? (specification ? "&" : "?") + "startTime=" + startDate : "");
        specification += (dateEnd ? (specification ? "&" : "?") + "endTime=" + dateEnd : "");
        return specification;
    }
    async function getData() {
        try {
            axios.defaults.headers.common['Authorization'] = `Basic ${localStorage.getItem('TOKEN')}`;
            const result = await axios.get(baseUrl + "timekeeping" + Specification())

            const resultx = result.data;
            setData(resultx.content)
            setTotalPages(resultx.totalPages)
        } catch (error) {
            console.error(error);
        }
    }

    const handleResetFilter = () => {
        setStartDate(null);
        setDateEnd(null);
        setResetFilter(!resetFilter)
    }

    const handleCloseModalCreateTimekeeping = () => {
        setCreateDay("")
        setCreateStartTime("")
        setCreateEndTime("")
        setCreateUserId("")
        setModalCreateTimekeeping("")
    }

    const handleCloseModalCreateRewardPunish=()=>{
        setRPDay("")
        setRPAmount("")
        setRPUserId("")
        setRPReason("")
        setCreateRewardPunish(false)
    }

    const handleOpenModal = (month, year, userId, fullName, DepartmentName) => {
        setMonth(month)
        setYear(year)
        setUserId(userId)
        setFullName(fullName)
        setDepartmentName(DepartmentName)
        setOpenModal(true)

    }

    async function CreateTimekeeping() {
        var axios = require('axios');
        var data = JSON.stringify({
            "userId": createUserId ? createUserId : "",
            "startTime": createStartTime ? (createStartTime.getHours() >= 10 ? createStartTime.getHours() : "0" + createStartTime.getHours()) +
                ":" + (createStartTime.getMinutes() >= 10 ? createStartTime.getMinutes() : "0" + createStartTime.getMinutes()) + ":00" : "",
            "timeEnd": createEndTime ? (createEndTime.getHours() >= 10 ? createEndTime.getHours() : "0" + createEndTime.getHours()) +
                ":" + (createEndTime.getMinutes() >= 10 ? createEndTime.getMinutes() : "0" + createEndTime.getMinutes()) + ":00" : "",
            "workday": createDay ? `${createDay.getYear() + 1900}-${createDay.getMonth() >= 10 ? createDay.getMonth() + 1 : "0" + (createDay.getMonth() + 1)}-${createDay.getDate() >= 10 ? createDay.getDate() : "0" + createDay.getDate()}` : ""
        });
        var config = {
            method: 'post',
            url: 'https://backend-hrm.herokuapp.com/api/v1/timekeeping',
            headers: {
                'Authorization': `Basic ${localStorage.getItem('TOKEN')}`,
                'Content-Type': 'application/json',
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                toastSuccess(`Chấm công cho nhân viên ${createUserId} thành công !`)
                getData()

            })
            .catch(function (error) {
                toastFail(`Chấm công cho nhân viên ${createUserId} thất bại !`)
            });
    }


    async function CreateRewardPunish() {
        var axios = require('axios');
        var data = JSON.stringify({
            "amount": RPamount,
            "reason": RPReason,
            "day": RPDay ? `${RPDay.getYear() + 1900}-${RPDay.getMonth() >= 10 ? RPDay.getMonth() + 1 : "0" + (RPDay.getMonth() + 1)}-${RPDay.getDate() >= 10 ? RPDay.getDate() : "0" + RPDay.getDate()}` : "",
            "userId": RPUserId
        });

        var config = {
            method: 'post',
            url: 'https://backend-hrm.herokuapp.com/api/v1/rewardpunish',
            headers: {
                'Authorization': `Basic ${localStorage.getItem('TOKEN')}`,
                'Content-Type': 'application/json',
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                toastSuccess(`Thưởng / Phạt cho nhân viên ${RPUserId} thành công !`)
                getData()
            })
            .catch(function (error) {
                toastFail(`Thưởng / Phạt cho nhân viên ${RPUserId} thất bại !`)
            });
    }

    useEffect(() => getData(), []);
    useEffect(() => getData(), [paging])
    useEffect(() => getData(), [resetFilter])
    return <>
        <div className="row-tool">
            <div className="input-search" >
                <input type="search" placeholder="Tìm kiếm ..." onChange={e => setSearch(e.target.value)} /><button><BsSearch onClick={() => getData()} /></button>
            </div>
            <div className="filter-time">
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={viLocale}>
                    <DatePicker
                        views={['year', 'month']}
                        label="Bắt đầu từ"
                        minDate={new Date('2000-01-01')}
                        maxDate= {dateEnd?new Date(dateEnd):new Date().setMonth(new Date().getMonth() + 1)}
                        value={startDate}
                        onChange={(newValue) => {
                            setStartDate(`${newValue.getYear() + 1900}-${(newValue.getMonth() + 1) >= 10 ? newValue.getMonth() + 1 : '0' + (newValue.getMonth() + 1)}-01`);
                        }}
                        renderInput={(params) => <TextField {...params} helperText={null} className="startTime" />}
                    />

                    <DatePicker
                        views={['year', 'month']}
                        label="đến"
                        minDate={startDate?new Date(startDate):new Date('2000-01-01')}
                        maxDate={new Date().setMonth(new Date().getMonth() + 1)}
                        value={dateEnd}
                        onChange={(newValue) => {
                            setDateEnd(`${newValue.getYear() + 1900}-${(newValue.getMonth() + 1) >= 10 ? newValue.getMonth() + 1 : '0' + (newValue.getMonth() + 1)}-01`);
                        }}
                        renderInput={(params) => <TextField {...params} helperText={null} className="endTime" />}
                    />
                </LocalizationProvider>
                <div className="buttonFilter" onClick={() => { getData();}} > <FaFilter /></div>
                <div className="buttonFilter" onClick={handleResetFilter} ><RiFilterOffFill /></div>
                <Button color="success" onClick={() => setModalCreateTimekeeping(true)}>Chấm công</Button>
                <Button color="success" onClick={() => setCreateRewardPunish(true)}>Thưởng/Phạt</Button>
            </div>
        </div>
        <div className="tablec">
            <table className="col-full table">
                <thead>
                    <tr>
                        <th style={{ width: "40px" }}>ID</th>
                        <th style={{ width: "200px" }}>Họ và tên</th>
                        <th style={{ width: "120px" }}>Ngày sinh</th>
                        <th style={{ width: "150px" }}>Email</th>
                        <th style={{ width: "150px" }}>Phòng ban</th>
                        <th style={{ width: "150px" }}>Lương cơ bản</th>
                        <th style={{ width: "150px" }}>Tháng</th>
                        <th style={{ width: "150px" }}>Tổng giờ làm</th>
                        <th style={{ width: "150px" }}>Tổng giờ tăng ca</th>
                        <th style={{ width: "150px" }}>Thưởng/phạt</th>
                        <th style={{ width: "150px" }}>Tổng thu nhập</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((data, index) => <SalaryUser key={index} id={data.user.id} fullname={data.user.firstname + " " + data.user.lastname}
                        dateOfBirth={data.user.dateOfBirth} salary={data.user.salary} department={data.user.department ? data.user.department.name : "Khong ton tai"}
                        email={data.user.email} monthAndYear={data.monthAndYear.month + "/" + data.monthAndYear.year} totalHourWork={data.totalHourWork}
                        totalHourOT={data.totalHourOT} totalRP={data.totalRP} totalSalary={data.totalSalary} month={data.monthAndYear.month} year={data.monthAndYear.year}
                        openModal={handleOpenModal} userId={data.user.id}
                        data={data} />
                    )}
                </tbody>
            </table>
        </div>
        <div className="pagination">
            <Pagination count={totalPages} showFirstButton showLastButton onChange={(e, v) => { setPaging(v) }} variant="outlined" color="primary" />
        </div>

        <Modal
            toggle={() => setOpenModal(false)}
            isOpen={openModal}
            size="xl"
        >
            <ModalHeader >
                Bảng lương chi tiết tháng {month}/{year}
                <p>Họ và tên : {fullName} Phòng ban : {departmentName}</p>
            </ModalHeader>
            <ModalBody>
                <Payroll month={month} year={year} userId={userId} />
            </ModalBody>
            <ModalFooter>
                <Button onClick={() => setOpenModal(false)}>
                    Thoát
                </Button>
            </ModalFooter>
        </Modal>


        <Modal
            toggle={() => setModalCreateTimekeeping(false)}
            isOpen={modalCreateTimekeeping}
            size="sm"
        >
            <ModalHeader >
                Chấm công
            </ModalHeader>
            <ModalBody>
                <TextField className="formCreate" id="outlined-basic" label="Mã nhân viên" variant="outlined" value={createUserId} onChange={(e) => setCreateUserId(e.target.value)} />
                <div>
                    <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        adapterLocale={viLocale}
                    >
                        <div>
                            <TimePicker
                                label="Giờ bắt đầu làm"
                                value={createStartTime}
                                onChange={(newValue) => {
                                    setCreateStartTime(newValue)
                                }}
                                renderInput={(params) => <TextField {...params} className="formCreate" />}
                            />
                        </div>

                        <div>
                            <TimePicker
                                label="Giờ nghỉ"
                                value={createEndTime}
                                onChange={(newValue) => setCreateEndTime(newValue)}
                                renderInput={(params) => <TextField {...params} className="formCreate" />}
                            />
                        </div>
                        <div>
                            <DatePicker
                                minDate={new Date('2000-01-01')}
                                maxDate={new Date().setMonth(new Date().getMonth() + 1)}
                                label="Ngày làm việc"
                                value={createDay}
                                onChange={(newValue) => {
                                    setCreateDay(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} className="formCreate" />}
                            />
                        </div>
                    </LocalizationProvider>

                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="success" onClick={() => CreateTimekeeping()}>
                    Chấm công
                </Button>
                <Button onClick={() => handleCloseModalCreateTimekeeping()}>
                    Thoát
                </Button>
            </ModalFooter>
        </Modal>


        <Modal
            toggle={() => setCreateRewardPunish(false)}
            isOpen={createRewardPunish}
            size="sm"
        >
            <ModalHeader >
                Thưởng / Phạt
            </ModalHeader>
            <ModalBody>
                <TextField className="formCreate" id="outlined-basic" label="Mã nhân viên" variant="outlined" value={RPUserId} onChange={(e) => setRPUserId(e.target.value)} />
                <div>
                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                        <div>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                                <Input
                                    id="standard-adornment-amount"
                                    value={RPamount}
                                    onChange={(e) => setRPAmount(e.target.value)}
                                    startAdornment={
                                        <InputAdornment position="start">VND</InputAdornment>
                                    }
                                />
                            </FormControl>
                        </div>
                    </Box>
                    <TextareaAutosize
                        className="formCreate"
                        aria-label="minimum height"
                        minRows={3}
                        placeholder="Lí do"
                        style={{ width: 250 }}
                        onChange={(e) => setRPReason(e.target.value)}
                    />
                    <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        adapterLocale={viLocale}
                    >
                        <div>
                            <DatePicker
                                minDate={new Date('2000-01-01')}
                                maxDate={new Date().setMonth(new Date().getMonth() + 1)}
                                label="Ngày"
                                value={RPDay}
                                onChange={(newValue) => {
                                    setRPDay(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} className="formCreate" />}
                            />
                        </div>
                    </LocalizationProvider>

                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="success" onClick={() => CreateRewardPunish()}>
                    Cập nhật
                </Button>
                <Button onClick={() => handleCloseModalCreateRewardPunish()}>
                    Thoát
                </Button>
            </ModalFooter>
        </Modal>

        <ToastContainer
            position="top-right"
            autoClose={3000}
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
export default SalaryPage
