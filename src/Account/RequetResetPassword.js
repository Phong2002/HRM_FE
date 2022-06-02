import{TiTick,TiTimes} from 'react-icons/ti'

function RequestResetPassword(props){

    return <>
        <div className="request">
            <p className="req-content">Tài khoản {props.username} yêu cầu cấp lại mật khẩu ! </p>
            <button className="req-confirm" onClick={()=>props.confirm("confirm",props.token,props.username)}>Xác nhận <TiTick/></button>
            <button className="req-refuse" onClick={()=>props.confirm("refuse",props.token,props.username)}>Từ chối <TiTimes/></button>
        </div>
    </>
}

export default  RequestResetPassword