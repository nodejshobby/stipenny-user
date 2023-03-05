import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar"
import Topbar from "../../components/topbar"
import styles from "./user.module.css"
import { Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux"
import AuthService from "../../services/Auth"
import { setUser } from "../../reducers/authReducer"



function User() {
  const user = useSelector((state) => state.auth.user);
  const message =  useSelector(state => state.stipenny.message)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  
   useEffect(() => { 
    
    if(!user) {
      navigate("/login")
    }
    
    (async ()=>{
    try {
       const response = await AuthService.getUser()
      const user  = response.data
      localStorage.setItem("user", JSON.stringify(user))
      dispatch(setUser(user))
    } catch(error){
      console.log(error)
    }
   })() }, [])

  return (
    <>
    { message &&  <Alert severity={message.type} color={message.type} className="toast-right">
        {message.message}
      </Alert>
    }
    <div className={styles.user}>
    <Sidebar user={user}/>
    <div className={styles.content} id="user-layout-content">
      <Topbar />
      <Outlet />
    </div>
    </div>
    </>
    
  );
}

export default User;
