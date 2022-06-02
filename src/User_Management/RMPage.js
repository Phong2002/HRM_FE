import './RMPage.css'
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import InforListUser from './InforListUser.js'
import { Routes, Route, Link } from 'react-router-dom'
import Modal from 'react-modal'
import InforUser from './InforUser';
import { Modal as MoDal,ModalHeader,ModalBody,ModalFooter,Button} from 'reactstrap'
import { BsSearch } from 'react-icons/bs'
import { FaFilter } from 'react-icons/fa'
import { baseUrl } from '../Url'
import Pagination from '@mui/material/Pagination';
import FilterRM from './FilterRM';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function RMPage() {

  const [paging,setPaging] = useState();

  const [totalPages,setTotalPages] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);

  const [dataModal, setDataModal] = useState({});

  const [search, setSearch] = useState();

  const [data, setdata] = useState([]);

  const [filterGender,setFilterGender] = useState();

  const [filterEndBirthDay,setFilterEndBirthDay] = useState(); 

  const [filterStartBirthDay,setFilterStartBirthDay] = useState();

  const [filterClassify,setFilterClassify] = useState("");

  const [filterStartWorkStartDate,setFilterStartWorkStartDate] = useState();

  const [filterEndWorkStartDate,setFilterEndWorkStartDate] = useState();

  const [isOpenModalFilter,setIsOpenModalFilter] = useState(false);

  const [sortBy,setSortBy]= useState("");
  const [typeSort,setTypeSort] = useState("");

  async function fetchData() {
    try {
      axios.defaults.headers.common['Authorization'] = `Basic ${localStorage.getItem('TOKEN')}`;
      const result = await axios.get(baseUrl + "users" + Specification())

      const resultx = result.data;
      setdata(resultx.content)
      setTotalPages(resultx.totalPages)
    } catch (error) {
      console.error(error);
    }
  }

  const Specification = () => {
    let specification = "";
    specification += (search ? (specification ? "&" : "?") + "search=" + search : "");
    specification += (filterGender ? (specification ? "&" : "?") + "gender=" + filterGender : "");
    specification += (filterStartBirthDay ? (specification ? "&" : "?") + "minBirthDay=" + filterStartBirthDay : "");
    specification += (filterEndBirthDay ? (specification ? "&" : "?") + "maxBirthDay=" + filterEndBirthDay : "");
    specification += (filterStartWorkStartDate ? (specification ? "&" : "?") + "minWorkStartDate=" + filterStartWorkStartDate : "");
    specification += (filterEndWorkStartDate ? (specification ? "&" : "?") + "maxWorkStartDate=" + filterEndWorkStartDate : "");
    specification += (filterClassify ? (specification ? "&" : "?") + "classify=" + filterClassify : "");
    specification += (paging ? (specification ? "&" : "?") + "page=" + paging +"&size=10" : "");
    specification += (sortBy ? (specification ? "&" : "?") + "sort="+ sortBy+(typeSort?","+typeSort:""):"")
    return specification;
  }

  const handleOpen = (data) => {
    setModalOpen(true)
    setDataModal(data)
  }

  useEffect(() => { fetchData() }, [])

  const handleUnfiltered=()=>{
    setFilterGender("")
    setFilterStartBirthDay(null)
    setFilterEndBirthDay(null)
    setFilterStartWorkStartDate(null)
    setFilterEndWorkStartDate(null)
    setIsOpenModalFilter(false)
    fetchData();
  }

  const Filter=()=>{
    fetchData();
    setPaging(1);
    setIsOpenModalFilter(false)
  }

 

  useEffect(() => {fetchData()}, [paging])
  useEffect(() => {fetchData()}, [filterClassify])
  useEffect(() => {fetchData()}, [sortBy])
  useEffect(() => {fetchData()}, [typeSort])


  return <>
    <div className="row-tool">
      <div className="input-search" >
      <input type="search" placeholder="Tìm kiếm ..." onChange={e => setSearch(e.target.value)} /><button><BsSearch onClick={() => fetchData()} /></button>
      </div>
      <div className="filter" onClick={() =>setIsOpenModalFilter(true)}>Lọc<FaFilter /></div>
      <div className="classify">
        <FormControl sx={{ m:-1, minWidth: 200 }}  size="small">
      <InputLabel id="classify" style={{ zIndex:-1}}>Loại hợp đồng</InputLabel>
      <Select
        labelId="classify"
        id="classify"
        value={filterClassify}
        label="loai hop dong"
        onChange={e=>{setFilterClassify(e.target.value);setPaging(1)}}
        
      >
        <MenuItem value="">
          <em>Tất cả</em>
        </MenuItem>
        <MenuItem value='chinh thuc'>Chính thức</MenuItem>
        <MenuItem value='khong chinh thuc'>Không chính thức</MenuItem>
        <MenuItem value='thoi vu'>Thời vụ</MenuItem>
        <MenuItem value='cong tac vien'>Cộng tác viên</MenuItem>
      </Select>
    </FormControl>
      </div>

      <div className="classify">
        <FormControl sx={{ m:-1, minWidth: 200 }}  size="small">
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
        <MenuItem value='lastname'>Tên</MenuItem>
        <MenuItem value='dateOfBirth'>Ngày sinh</MenuItem>
        <MenuItem value='workStartDate'>Ngày bắt đầu làm việc</MenuItem>
        <MenuItem value='salary'>Mức lương cơ bản</MenuItem>
      </Select>
    </FormControl>
      </div>

      <div className="classify">
        <FormControl sx={{ m:-1, minWidth: 150 }}  size="small">
      <InputLabel id="typesort" style={{ zIndex:-1}}>Theo thứ tự</InputLabel>
      <Select disabled={sortBy===""} 
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

    </div>
    <div className="tablec">
    <table className="col-full table">
      <thead>
        <tr>
          <th style={{width:"40px"}}>ID</th>
          <th style={{width:"200px"}}>Họ và tên</th>
          <th style={{width:"100px"}}>Giới tính</th>
          <th style={{width:"150px"}}>Quê quán</th>
          <th style={{width:"120px"}}>Ngày sinh</th>
          <th style={{width:"150px"}}>Email</th>
          <th style={{width:"150px"}}>Phòng ban</th>
          <th style={{width:"200px"}}>Ngày bắt đầu làm việc</th>
          <th style={{width:"150px"}}>Mức lương cơ bản</th>
        </tr>
      </thead>
      <tbody>
        {data.map(data => <InforListUser key={data.id} id={data.id} fullname={data.firstname + " " + data.lastname} gender={data.gender} address={data.address} dateOfBirth={data.dateOfBirth} salary={data.salary} department={data.department ? data.department.name : "Khong ton tai"} workStart={data.workStartDate} email={data.email}
          openModal={() => handleOpen(data)} data={data} />
        )}
      </tbody>
    </table>
    </div>
    <div className="pagination">
    <Pagination count={totalPages}  showFirstButton showLastButton onChange={(e,v) => {setPaging(v) }} variant="outlined" color="primary"/>
    </div>

    <Modal isOpen={modalOpen} onRequestClose={() => { setModalOpen(false) }} ariaHideApp={false} >
      <InforUser data={dataModal} closeModal={() => { setModalOpen(false) }} resetData={() => fetchData()} />
    </Modal>



    <div>
  <MoDal
    toggle={()=>{setIsOpenModalFilter(false)}}
    isOpen={isOpenModalFilter}
    size="lg"
  >
    <ModalHeader toggle={()=>{setIsOpenModalFilter(false)}}>
      Lọc kết quả
    </ModalHeader>
    <ModalBody>
    <FilterRM  setStartBirthday={setFilterStartBirthDay} setEndBirthday={setFilterEndBirthDay} setStartWorkTime={setFilterStartWorkStartDate} 
    setEndWorkTime={setFilterEndWorkStartDate} setFilterGender={setFilterGender} gender={filterGender} startBirthday={filterStartBirthDay} 
    endBirthday={filterEndBirthDay} startWorkTime={filterStartWorkStartDate} endWorkTime={filterEndWorkStartDate} />
    </ModalBody>
    <ModalFooter>
      <Button
        color="primary"
        onClick={Filter}
      >
        Áp dụng
      </Button>
      <Button
        color="primary"
        onClick={()=>handleUnfiltered()}
      >
       Bỏ lọc
      </Button>
      {' '}
    </ModalFooter>
  </MoDal>
</div>
 
 


  </>



}

export default RMPage;
