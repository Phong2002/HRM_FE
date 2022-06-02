function DepartmentList(props)
{   
    return <tr onDoubleClick={props.openModal} className="infor">
    <td><input type="checkbox" padding="18px" onClick={(e)=>props.tick(e.target.checked,props.id,props.name)}></input></td>
    <td>{props.id}</td>
    <td>{props.name}</td>
    <td>{props.introduce}</td>
    <td>{props.foundingDate}</td>
    <td>{props.totalMember}</td>
    </tr>
}

export default DepartmentList;