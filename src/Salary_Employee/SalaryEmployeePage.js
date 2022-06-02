import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../Url';
import Pagination from '@mui/material/Pagination';
import SalaryUser from './SalaryEmployee.js'
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



function SalaryEmployeePage() {

    const [data, setData] = useState([])
    const [totalPages, setTotalPages] = useState(0);
    const [paging, setPaging] = useState(1);
    const [openModal, setOpenModal] = useState(false);
    const [startDate, setStartDate] = useState("")
    const [dateEnd, setDateEnd] = useState("")
    const [resetFilter, setResetFilter] = useState(true);
    const [month, setMonth] = useState()
    const [year, setYear] = useState()
    const [userId, setUserId] = useState()
    const [fullName, setFullName] = useState()
    const [departmentName, setDepartmentName] = useState()



    const Specification = () => {
        let specification = "?userId="+localStorage.getItem("ID")
        specification += (paging ? (specification ? "&" : "?") + "page=" + paging + "&size=8" : "");
        specification += (startDate ? (specification ? "&" : "?") + "startTime=" + startDate : "");
        specification += (dateEnd ? (specification ? "&" : "?") + "endTime=" + dateEnd : "");
        return specification;
    }
    async function getData() {
        try {
            axios.defaults.headers.common['Authorization'] = `Basic ${localStorage.getItem('TOKEN')}`;
            const result = await axios.get(baseUrl + "timekeeping/user/" + Specification())

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



    const handleOpenModal = (month, year, userId, fullName, DepartmentName) => {
        setMonth(month)
        setYear(year)
        setUserId(userId)
        setFullName(fullName)
        setDepartmentName(DepartmentName)
        setOpenModal(true)
    }


    useEffect(() => getData(), []);
    useEffect(() => getData(), [paging])
    useEffect(() => getData(), [resetFilter])
    return <>
        <div className="row-tool">
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
                <div className="buttonFilter" onClick={() => { getData(); console.log(startDate); }} > <FaFilter /></div>
                <div className="buttonFilter" onClick={handleResetFilter} ><RiFilterOffFill /></div>
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
    </>
}
export default SalaryEmployeePage