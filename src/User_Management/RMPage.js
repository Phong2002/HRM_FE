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

  const [paging,setPaging] = useState(1);

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
      <input type="search" placeholder="T??m ki???m ..." onChange={e => setSearch(e.target.value)} /><button><BsSearch onClick={() => fetchData()} /></button>
      </div>
      <div className="filter" onClick={() =>setIsOpenModalFilter(true)}>L???c<FaFilter /></div>
      <div className="classify">
        <FormControl sx={{ m:-1, minWidth: 200 }}  size="small">
      <InputLabel id="classify" style={{ zIndex:-1}}>Lo???i h???p ?????ng</InputLabel>
      <Select
        labelId="classify"
        id="classify"
        value={filterClassify}
        label="loai hop dong"
        onChange={e=>{setFilterClassify(e.target.value);setPaging(1)}}
        
      >
        <MenuItem value="">
          <em>T???t c???</em>
        </MenuItem>
        <MenuItem value='chinh thuc'>Ch??nh th???c</MenuItem>
        <MenuItem value='khong chinh thuc'>Kh??ng ch??nh th???c</MenuItem>
        <MenuItem value='thoi vu'>Th???i v???</MenuItem>
        <MenuItem value='cong tac vien'>C???ng t??c vi??n</MenuItem>
      </Select>
    </FormControl>
      </div>

      <div className="classify">
        <FormControl sx={{ m:-1, minWidth: 200 }}  size="small">
      <InputLabel id="sortby" style={{ zIndex:-1}}>S???p x???p theo</InputLabel>
      <Select
        labelId="sortby"
        id="sortby"
        value={sortBy}
        label="sap xep theo "
        onChange={e=>{setSortBy(e.target.value);setPaging(1);setTypeSort("")}}
      >
        <MenuItem value="">
          <em>M???c ?????nh</em>
        </MenuItem>
        <MenuItem value='lastname'>T??n</MenuItem>
        <MenuItem value='dateOfBirth'>Ng??y sinh</MenuItem>
        <MenuItem value='workStartDate'>Ng??y b???t ?????u l??m vi???c</MenuItem>
        <MenuItem value='salary'>M???c l????ng c?? b???n</MenuItem>
      </Select>
    </FormControl>
      </div>

      <div className="classify">
        <FormControl sx={{ m:-1, minWidth: 150 }}  size="small">
      <InputLabel id="typesort" style={{ zIndex:-1}}>Theo th??? t???</InputLabel>
      <Select disabled={sortBy===""} 
        labelId="typesort"
        id="typesort"
        value={typeSort}
        label=" theo thu tu "
        onChange={e=>{setTypeSort(e.target.value);setPaging(1)}}
      > 
        <MenuItem value='asc'>T??ng d???n</MenuItem>
        <MenuItem value='desc'>Gi???m d???n</MenuItem>
      </Select>
    </FormControl>
      </div>

    </div>
    <div className="tablec">
    <table className="col-full table">
      <thead>
        <tr>
          <th style={{width:"40px"}}>ID</th>
          <th style={{width:"200px"}}>H??? v?? t??n</th>
          <th style={{width:"100px"}}>Gi???i t??nh</th>
          <th style={{width:"150px"}}>Qu?? qu??n</th>
          <th style={{width:"120px"}}>Ng??y sinh</th>
          <th style={{width:"150px"}}>Email</th>
          <th style={{width:"150px"}}>Ph??ng ban</th>
          <th style={{width:"200px"}}>Ng??y b???t ?????u l??m vi???c</th>
          <th style={{width:"150px"}}>M???c l????ng c?? b???n</th>
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
      L???c k???t qu???
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
        ??p d???ng
      </Button>
      <Button
        color="primary"
        onClick={()=>handleUnfiltered()}
      >
       B??? l???c
      </Button>
      {' '}
    </ModalFooter>
  </MoDal>
</div>
 
 


  </>



}

export default RMPage;
