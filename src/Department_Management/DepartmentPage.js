
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import { baseUrl } from '../Url'
import DepartmentList from './DepartmentList';
import Department from './Department.js';
import './Department.css'
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap'
import CreateDepartment from './CreateDepartment';
import { ToastContainer, toast } from 'react-toastify';

import { BsSearch } from 'react-icons/bs'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';

function DepartmentPage() {

  const toastSuccess = () => toast.success('Xóa các phòng ban thành công', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });;

  const toastFail = () => toast.error('Xóa các phòng ban thất bại', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });


  const [modalOpen, setModalOpen] = useState(false);

  const [dataModal, setDataModal] = useState({});

  const [modalCreateOpen, setModalCreateOpen] = useState(false);

  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const [ticks, setTicks] = useState([]);

  const [tickDeps, setTickDeps] = useState([]);

  const [data, setdata] = useState([]);



  // filter 

  const [paging, setPaging] = useState(1);

  const [totalPages, setTotalPages] = useState(0);

  const [search, setSearch] = useState();

  const [sortBy, setSortBy] = useState("");

  const [typeSort, setTypeSort] = useState("");

  const Specification = () => {
    let specification = "";
    specification += (search ? (specification ? "&" : "?") + "search=" + search : "");
    specification += (paging ? (specification ? "&" : "?") + "page=" + paging + "&size=8" : "");
    specification += (sortBy ? (specification ? "&" : "?") + "sort=" + sortBy + (typeSort ? "," + typeSort : "") : "")
    return specification;
  }


  async function fetchData() {
    try {
      axios.defaults.headers.common['Authorization'] = `Basic ${localStorage.getItem('TOKEN')}`;
      const result = await axios.get(baseUrl + "departments" + Specification())

      const resultx = result.data;
      setdata(resultx.content)
      setTotalPages(resultx.totalPages)
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteDepartments() {

    var axios = require('axios');

    let tickIdDeps = "";

    ticks.map(value => { tickIdDeps += value + "," })

    var config = {
      method: 'delete',
      url: `${baseUrl}departments/${tickIdDeps}`,
      headers: {
        'Authorization': `Basic ${localStorage.getItem("TOKEN")}`,
        'Content-Type': 'application/json',

      },
    };

    axios(config)
      .then(function (response) {
        setModalDeleteOpen(false);
        toastSuccess();
        fetchData();
        setTicks([]);
        setTickDeps([])
      })
      .catch(function (error) {
        setModalDeleteOpen(false);
        toastFail();
      });

  }


  const handleTick = (tick, id, name) => {
    if (tick === true) {
      setTicks([...ticks, id]);
      setTickDeps([...tickDeps, name]);
    }
    else {
      let newTicks = ticks.filter(value => value !== id)
      let newTickDeps = tickDeps.filter(value => value !== name)
      setTicks([...newTicks]);
      setTickDeps([...newTickDeps]);
    }
  }

  const handleOpen = (data) => {
    setModalOpen(true)
    setDataModal(data)
  }

  useEffect(() => { fetchData() }, [])
  useEffect(() => { fetchData() }, [paging])
  useEffect(() => { fetchData() }, [sortBy])
  useEffect(() => { fetchData() }, [typeSort])

  return <div className="dep-ful">
    <div className="row-tool">
      <div className="input-search" >
        <input type="search" placeholder="Tìm kiếm ..." onChange={e => setSearch(e.target.value)} /><button><BsSearch onClick={() => { fetchData(); setPaging(1) }} /></button>
      </div>
      <div className="classify">
        <FormControl sx={{ m: -1, minWidth: 200 }} style={{ margin: "10px 0" }} size="small">
          <InputLabel id="sortby" style={{ zIndex: -1 }}>Sắp xếp theo</InputLabel>
          <Select
            labelId="sortby"
            id="sortby"
            value={sortBy}
            label="sap xep theo "
            onChange={e => { setSortBy(e.target.value); setPaging(1); setTypeSort("") }}
          >
            <MenuItem value="">
              <em>Mặc định</em>
            </MenuItem>
            <MenuItem value='name'>Tên</MenuItem>
            <MenuItem value='foundingDate'>Ngày thành lập</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="classify">
        <FormControl sx={{ m: -1, minWidth: 150 }} style={{ margin: "10px 0" }} size="small">
          <InputLabel id="typesort" style={{ zIndex: -1 }}>Theo thứ tự</InputLabel>
          <Select
            labelId="typesort"
            id="typesort"
            value={typeSort}
            label=" theo thu tu "
            onChange={e => { setTypeSort(e.target.value); setPaging(1) }}
            disabled={sortBy === ""}
          >

            <MenuItem value='asc'>Tăng dần</MenuItem>
            <MenuItem value='desc'>Giảm dần</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        <div className="col-20">
          <Button className=" button" color="success" onClick={() => { setModalCreateOpen(true) }}>Tạo phòng ban</Button>
          <Button className=" button" color="success" onClick={() => { setModalDeleteOpen(true) }}>Xóa phòng ban</Button>
        </div>
        <div className="col-80 table col-ful">
          <table className="col-full table">
            <thead>
              <tr>
                <th style={{ width: "20px" }}>Tick</th>
                <th style={{ width: "150px" }}>Mã phòng ban</th>
                <th style={{ width: "200px" }}>Tên phòng ban</th>
                <th >Giới thiệu</th>
                <th style={{ width: "150px" }}>Ngày thành lập</th>
                <th style={{ width: "170px" }}>Số lương thành viên</th>
              </tr>
            </thead>
            <tbody>
              {data.map(data => <DepartmentList key={data.id} id={data.id} name={data.name} introduce={data.introduce} foundingDate={data.foundingDate} dateOfBirth={data.dateOfBirth} totalMember={data.totalMember}
                openModal={() => handleOpen(data)} data={data} tick={handleTick} />
              )}
            </tbody>
          </table>
          <div className="pagination">
            <Pagination count={totalPages} value={paging} showFirstButton showLastButton onChange={(e, v) => { setPaging(v) }} variant="outlined" color="primary" />
          </div>
          <Modal isOpen={modalOpen} toggle={() => { setModalOpen(false) }} size="lg" centered>
            <Department data={dataModal} closeModal={() => { setModalOpen(false) }} resetData={() => fetchData()} />
          </Modal>

          <Modal isOpen={modalCreateOpen} toggle={() => { setModalCreateOpen(false) }} size="xl" centered>
            <CreateDepartment resetData={() => { fetchData() }} closeModal={() => { setModalCreateOpen(false) }}></CreateDepartment>
          </Modal>



          <Modal isOpen={modalDeleteOpen} toggle={() => { setModalDeleteOpen(false) }} size="lg" centered>

            <ModalHeader toggle={() => { setModalDeleteOpen(false) }}>
              Xóa phòng ban
            </ModalHeader>
            <ModalBody>
              Xóa các phòng ban :
              <ul>
                {tickDeps.map((value, key) => <li className="block" key={key}>{value}</li>)}
              </ul>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={deleteDepartments}
              >
                Xóa phòng ban
              </Button>
              {' '}
              <Button onClick={() => setModalDeleteOpen(false)}>
                Cancel
              </Button>
            </ModalFooter>

          </Modal>
        </div>
      </div>
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
    </div>
  </div>



}

export default DepartmentPage;
