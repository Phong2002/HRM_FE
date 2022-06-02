
import Login from './Login/Login.js'
import HomeAdmin from './HomeAdmin.js'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Forgot from './Login/Forgotpassword.js'
import Page404 from './Page404.js'
import Home from './Home.js'
import HomeEmployee from './HomeEmployee.js'
import HomePageAdmin from './HomePage';
import RMPage from './User_Management/RMPage';
import SalaryPage from './Salary_Management/SalaryPage';
import DepartmentPage from './Department_Management/DepartmentPage';
import Notification from './Notification/NotificationPage.js';
import Account from './Account/Account.js';
import ResetPassword from './Account/ResetPassword.js'
import Profile from './Profile.js'
import HomePageEmployee from './HomePageEmployee.js';
import NotifyEmployee from './NotifyEmployee.js';
import SalaryEmployeePage from './Salary_Employee/SalaryEmployeePage.js'
import ListAccount from './Account/ListAccount.js';

function App() {


  return <>

    <Routes>
      <Route path="login" element={<Login />}></Route>
      <Route path="forgot" element={<Forgot />}></Route>
      <Route path="" element={<Home />}>
        <Route path="admin" element={<HomeAdmin />}>
          <Route path="" element={<HomePageAdmin />} />
          <Route path="records" element={<RMPage />} />
          <Route path="salary" element={<SalaryPage />} />
          <Route path="department" element={<DepartmentPage />} />
          <Route path="notify" element={<Notification />} />
          <Route path="account" element={<Account />}>
            <Route path="" element={<ListAccount/>}/>
            <Route path="resetpassword" element={<ResetPassword />} />
          </Route>
        </Route>

        <Route path="employee" element={<HomeEmployee/>}>
          <Route path="" element={<HomePageEmployee/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path ="salary" element={<SalaryEmployeePage/>}/>
          <Route path= "notify" element={<NotifyEmployee/>}/>
        </Route>
      </Route>
      <Route path="page404" element={<Page404 />}></Route>
    </Routes>
  </>

}

export default App;
