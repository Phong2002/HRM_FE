import './Page404.css'

import {useNavigate} from "react-router-dom";

function Page404(){
    let navigate = useNavigate()
    return <><div className="body404">
    <div className="noise"></div>
<div className="overlay"></div>
<div className="terminal">
  <h1>Error <span className="errorcode">500</span></h1>
  <p className="output">Oh , có vẻ như trang web của chúng tôi lại lỗi rồi !</p>
  <p className="output">Bạn có thể <a className="goback">load lại trang</a> hoặc <a className="goback" onClick={()=>navigate('../home')}>trở về trang chủ</a>.</p>
  <p className="output">Chúc bạn may mắn lần sau !</p>
</div>
</div>
    </>
}

export default Page404;