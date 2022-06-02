function SalaryEmployee(props){
    return <tr onDoubleClick={()=>props.openModal(props.month,props.year,props.userId,props.fullname,props.department)} className="infor">
    <td>{props.id}</td>
    <td>{props.fullname}</td>
    <td>{props.dateOfBirth}</td>
    <td>{props.email}</td>
    <td>{props.department}</td>
    <td>{props.salary}</td>
    <td>{props.monthAndYear}</td>
    <td>{props.totalHourWork}</td>
    <td>{props.totalHourOT}</td>
    <td>{props.totalRP}</td>
    <td>{props.totalSalary}</td>
    </tr>
}

export default SalaryEmployee;