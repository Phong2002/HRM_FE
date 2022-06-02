import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Home(){
    const navigate = useNavigate();

    const isLogin=()=>{
        if(!localStorage.getItem("TOKEN")){
            navigate("../login")
        }
        else{
            if(localStorage.getItem("ROLE")==="Admin"){
                navigate("./admin")
            }
            else if (localStorage.getItem("ROLE")==="Employee"){
                navigate("./employee")
            }
        }
    }
    useEffect(()=>isLogin(),[]);
    return <>
    <Outlet/>
    </>
}

export default Home;