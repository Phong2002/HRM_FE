import {BsPencilSquare} from 'react-icons/bs'
import {TiTick} from 'react-icons/ti'

function IconFix(props){
    return <div className="fix"  onClick={()=>props.setToggle(!props.toggle)}>{!props.toggle?
    <BsPencilSquare/>
    :<TiTick/>} {!props.toggle?"Sửa":"Xong"}</div>
}

export default IconFix