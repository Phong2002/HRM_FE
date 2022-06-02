function AccountInfo(props) {
    return <tr>
        <td><input type="checkbox" padding="18px" onClick={(e) => props.tick(e.target.checked, props.id, props.fullname)}></input></td>
        <td>{props.id}</td>
        <td>{props.fullname}</td>
        <td>{props.gender}</td>
        <td>{props.dateOfBirth}</td>
        <td>{props.email}</td>
        <td>{props.username}</td>
    </tr>
}

export default AccountInfo