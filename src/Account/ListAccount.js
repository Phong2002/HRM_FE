import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { Modal as MoDal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { BsSearch } from 'react-icons/bs'
import { baseUrl } from '../Url'
import Pagination from '@mui/material/Pagination';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AccountInfo from "./AccountInfo";
import CreateUser from './CreateUser';
import { ToastContainer, toast } from 'react-toastify';

function ListAccount() {

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


    const [data, setData] = useState([])

    const [paging, setPaging] = useState();

    const [totalPages, setTotalPages] = useState(0);

    const [modalOpenCreateUser, setModalOpenCreateUser] = useState(false);

    const [search, setSearch] = useState();

    const [sortBy, setSortBy] = useState("");

    const [typeSort, setTypeSort] = useState("");

    const [ticks, setTicks] = useState([]);

    const [tickUsers, setTickUsers] = useState([]);

    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

    async function fetchData() {
        try {
            axios.defaults.headers.common['Authorization'] = `Basic ${localStorage.getItem('TOKEN')}`;
            const result = await axios.get(baseUrl + "users" + Specification())

            const resultx = result.data;
            setData(resultx.content)
            setTotalPages(resultx.totalPages)
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteUsers() {

        var axios = require('axios');

        let tickIdDeps = "";

        ticks.map(value => { tickIdDeps += value + "," })

        var config = {
            method: 'delete',
            url: `${baseUrl}users/${tickIdDeps}`,
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
                setTickUsers([])
            })
            .catch(function (error) {
                setModalDeleteOpen(false);
                toastFail();
            });

    }



    const Specification = () => {
        let specification = "";
        specification += (search ? (specification ? "&" : "?") + "search=" + search : "");
        specification += (paging ? (specification ? "&" : "?") + "page=" + paging + "&size=9" : "");
        specification += (sortBy ? (specification ? "&" : "?") + "sort=" + sortBy + (typeSort ? "," + typeSort : "") : "")
        return specification;
    }


    const handleTick = (tick, id, name) => {
        if (tick === true) {
            setTicks([...ticks, id]);
            setTickUsers([...tickUsers, name]);
        }
        else {
            let newTicks = ticks.filter(value => value !== id)
            let newtickUsers = tickUsers.filter(value => value !== name)
            setTicks([...newTicks]);
            setTickUsers([...newtickUsers]);
        }
    }


    useEffect(() => { fetchData() }, [])
    useEffect(() => { fetchData() }, [paging])
    useEffect(() => { fetchData() }, [sortBy])
    useEffect(() => { fetchData() }, [typeSort])


    return <>
        <div className="row-tool">
            <div className="input-search" >
                <input type="search" placeholder="Tìm kiếm ..." onChange={e => setSearch(e.target.value)} /><button><BsSearch onClick={() => fetchData()} /></button>
            </div>
            <div style={{ margin: "30px 10px" }}>

                <div className="classify">
                    <FormControl sx={{ m: -1, minWidth: 200 }} size="small">
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
                            <MenuItem value='lastname'>Tên</MenuItem>
                            <MenuItem value='dateOfBirth'>Ngày sinh</MenuItem>
                            <MenuItem value='workStartDate'>Ngày bắt đầu làm việc</MenuItem>
                            <MenuItem value='salary'>Mức lương cơ bản</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div className="classify">
                    <FormControl sx={{ m: -1, minWidth: 150 }} size="small">
                        <InputLabel id="typesort" style={{ zIndex: -1 }}>Theo thứ tự</InputLabel>
                        <Select disabled={sortBy === ""}
                            labelId="typesort"
                            id="typesort"
                            value={typeSort}
                            label=" theo thu tu "
                            onChange={e => { setTypeSort(e.target.value); setPaging(1) }}
                        >
                            <MenuItem value='asc'>Tăng dần</MenuItem>
                            <MenuItem value='desc'>Giảm dần</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div className="classify"><Button color="info" onClick={() => setModalOpenCreateUser(true)}>Tạo tài khoản</Button></div>
                <div className="classify"><Button color="info" onClick={()=>setModalDeleteOpen(true)}>Xóa tài khoản </Button></div>
                
            </div>
        </div>
        <div className="tablec">
            <table className="col-full table">
                <thead>
                    <tr>
                    <th style={{ width: "40px" }}>Tick</th>
                        <th style={{ width: "40px" }}>ID</th>
                        <th style={{ width: "200px" }}>Họ và tên</th>
                        <th style={{ width: "100px" }}>Giới tính</th>
                        <th style={{ width: "120px" }}>Ngày sinh</th>
                        <th style={{ width: "150px" }}>Email</th>
                        <th style={{ width: "150px" }}>Tài khoản</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(data => <AccountInfo key={data.id} id={data.id} fullname={data.firstname + " " + data.lastname} gender={data.gender} tick={handleTick} address={data.address} dateOfBirth={data.dateOfBirth} email={data.email}
                        username={data.username}
                    />
                    )}
                </tbody>
            </table>
        </div>
        <div className="pagination">
            <Pagination count={totalPages} showFirstButton showLastButton onChange={(e, v) => { setPaging(v) }} variant="outlined" color="primary" />
        </div>



        <div>
            <MoDal
                size="lg"
                isOpen={modalOpenCreateUser}
                toggle={() => setModalOpenCreateUser(false)}
            >
                <ModalHeader toggle={() => setModalOpenCreateUser(false)}>
                    Tạo tài khoản
                </ModalHeader>
                <ModalBody>
                    <CreateUser resetData={fetchData} tick={handleTick} />
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </MoDal>

            <MoDal isOpen={modalDeleteOpen} toggle={() => { setModalDeleteOpen(false) }} size="lg" centered>

                <ModalHeader toggle={() => { setModalDeleteOpen(false) }}>
                    Xóa phòng ban
                </ModalHeader>
                <ModalBody>
                    Xóa các phòng ban :
                    <ul>
                        {tickUsers.map((value, key) => <li className="block" key={key}>{value}</li>)}
                    </ul>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={deleteUsers}
                    >
                        Xóa phòng ban
                    </Button>
                    {' '}
                    <Button onClick={() => setModalDeleteOpen(false)}>
                        Cancel
                    </Button>
                </ModalFooter>

            </MoDal>

        </div>
    </>
}

export default ListAccount;