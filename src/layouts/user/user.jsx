import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar"
import Topbar from "../../components/topbar"
import styles from "./user.module.css"
import { Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux"
import AuthService from "../../services/Auth"
import { setToken, setUser } from "../../reducers/authReducer"
import { setNotification } from "../../reducers/stipennyReducer";



function User() {
  const user = useSelector((state) => state.auth.user);
  const message =  useSelector(state => state.stipenny.message)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const getUser = async ()=>{
    try {
       const response = await AuthService.getUser()
       if(response.status === 201){
        const user  = response.data
        localStorage.setItem("user", JSON.stringify(user))
        dispatch(setUser(user))
       }
    } catch(error){
      if(error.response.status === 401){
        dispatch(setNotification({type: "error", message: "Expired or invalid Token/Session"}))
        setTimeout(()=>{
           dispatch(setUser(null))
          dispatch(setToken(null))
          dispatch(setNotification(null))
          navigate("/login")
        }, 5000)
      }
      else {
        dispatch(setNotification({type: "error", message: "Something went wrong!"}))
      setTimeout(()=>{
        dispatch(setNotification(null))
      }, 5000)
      }
      
    }
   }

  
   useEffect(() => { 
    
    if(!user) {
      navigate("/login")
    }
    
    getUser()
  // eslint-disable-next-line
  }, [])

  return (
    <>
    { message &&  <Alert severity={message.type} color={message.type} className="toast-right" sx={{ zIndex: 100 }}>
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
