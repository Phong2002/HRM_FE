function InforListUser(props)
{     
    return <tr onDoubleClick={props.openModal} className="infor">
    <td>{props.id}</td>
    <td>{props.fullname}</td>
    <td>{props.gender}</td>
    <td>{props.address}</td>
    <td>{props.dateOfBirth}</td>
    <td>{props.email}</td>
    <td>{props.department}</td>
    <td>{props.workStart}</td>
    <td>{props.salary}</td>
    </tr>
}

export default InforListUser;