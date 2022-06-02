function NotificationList(props)
{   
    return <tr className="infor">
    <td>{props.id}</td>
    <td>{props.departmentName}</td>
    <td>{props.sentdate}</td>
    <td>{props.title}</td>
    <td>{props.content}</td>
    </tr>
}

export default NotificationList;