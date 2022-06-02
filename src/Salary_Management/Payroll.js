import { useEffect, useState } from "react"
import axios from "axios"
import { baseUrl } from "../Url";

function Payroll(props){
    const [data,setData] = useState([]);

    async function getData() {
        try {
            axios.defaults.headers.common['Authorization'] = `Basic ${localStorage.getItem('TOKEN')}`;
            const result = await axios.get(`${baseUrl}timekeeping/payroll?month=${props.month}&year=${props.year}&userId=${props.userId}`);
            setData(result.data)
            
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>getData(),[]);

    return <>
       <div className="tablec">
            <table className="col-full table">
                <thead>
                    <tr>
                        <th style={{ width: "120px" }}>Ngày làm việc</th>
                        <th style={{ width: "150px" }}>Giờ bắt đầu</th>
                        <th style={{ width: "150px" }}>Giờ nghỉ</th>
                        <th style={{ width: "150px" }}>Số giờ làm</th>
                        <th style={{ width: "150px" }}>Số giờ tăng ca</th>
                        <th style={{ width: "250px" }}>Thưởng/phạt</th>
                        <th style={{ width: "150px" }}>Tổng tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((data, index) => {return <>
                    <tr>
                        <td>{data.day}</td>
                        <td>{data.startTime}</td>
                        <td>{data.timeEnd}</td>
                        <td>{data.hours}</td>
                        <td>{data.overTime}</td>
                        <td className="pad0">{data.rewardPunishs?<>
                        <tbody>
                        
                            {data.rewardPunishs.map((data)=><><tr><td key={data.id}>{data.amount}</td><td key={data.id}>{data.reason}</td></tr></>)} 
                        </tbody></>
                        :""}</td>
                        <td>{data.wage}</td>
                    </tr>
                    
                    </>} 
                    )}
                </tbody>
            </table>
        </div>
    </>

}

export default Payroll