
import SlideShow from './SlideShow.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css'
import { TabScrollButton } from '@mui/material';

function HomePageAdmin() {
    return <>
        <div className="home">
            <div className="introduce" style={{marginTop:"0"}}>
                <div className="title-intro">
                    WEB HRM là gì ?
                </div>
                <div className="content-intro">
                    Base HRM là ứng dụng di động nằm trong bộ sản phẩm Quản trị và Phát triển nhân sự Base HRM+. Base HRM được kết nối với các ứng dụng quản trị nhân sự khác trong bộ sản phẩm, từ đó hiển thị thông tin đầy đủ, cập nhật nhất trên smartphone của mỗi nhân sự.
                </div>
            </div>

            <div className="introduce">
                <div className="title-intro">
                    Đơn vị phát triển
                </div>
                <div className="content-intro">
                    Nhóm 8 - Lớp kỹ thuật phần mềm 4 <br />
                    Được nghiên cứu và phát triển từ tháng 3/2022 đến nay ứng dụng web HRM đã được đưa vào sử dụng với hơn 1000+ khách hàng
                </div>
            </div>

            <div className="introduce">
                <div className="title-intro">
                    Một số tính năng của WEB HRM
                </div>
                <div className="slideshow" style={{ width: "990px", margin: "0", display: "inline-block" }}>
                <SlideShow />
                </div>
            </div>

          
            <div className="introduce">
                <div className="title-intro">
                    Lợi ích của WEB HRM
                </div>
                <div className="content-intro">
                    Thông tin cá nhân, lý lịch, pháp lý của mỗi nhân sự <br/>
                    Dữ liệu chấm công thời gian thực <br/>
                    Chi tiết bảng lương hàng tháng <br/>
                    Mục tiêu công việc và KPI cá nhân theo tháng, quý <br/>
                    Lộ trình và kế hoạch phát triển của nhân sự tại công ty <br/>
                    Thông tin tài sản công ty dưới sự quản lý của nhân sự <br/>
                    Chính sách và quy định về làm việc, khen thưởng trong công ty cần tuân thủ <br/>
                    Thông tin phòng ban, cơ cấu tổ chức công ty <br/>
                </div>
            </div>
        </div>
        <footer></footer>
    </>
}

export default HomePageAdmin