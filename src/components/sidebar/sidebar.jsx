import React from 'react'
import styles from './sidebar.module.css'
import HomeIcon from '@mui/icons-material/Home';
import PaidIcon from '@mui/icons-material/Paid';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SettingsIcon from '@mui/icons-material/Settings';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AuthService from "../../services/Auth";
import { setToken , setUser } from  "../../reducers/authReducer"
import { setNotification } from  "../../reducers/stipennyReducer"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

function Sidebar({ user }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

    window.onresize = () => {
      const SideBar = document.getElementById("dashboard-sidebar");
      const DashboardContent = document.getElementById("user-layout-content");
      if(SideBar && DashboardContent){
        if(window.innerWidth > 767.98){
          SideBar.style.display = "flex";
          DashboardContent.style.opacity = 1;
        }else{
          SideBar.style.display = "none";
          DashboardContent.style.opacity = 1;
       }
      }
    }

    const closeSidebar = ()=>{
      const SideBar = document.getElementById("dashboard-sidebar");
      const DashboardContent = document.getElementById("user-layout-content");
      SideBar.style.display = "none";
      DashboardContent.style.opacity = 1;
    }

    const handleLogout = async (e)=>{
      e.preventDefault();
       
      try {
        const response = await AuthService.logout();
        if(response.status === 200){
          localStorage.clear();
          dispatch(setNotification({type: "success", message: "Logout is successful.You will be redirected shortly"}));
          setTimeout(()=>{
            dispatch(setToken(null));
            dispatch(setUser(null));
            dispatch(setNotification(null))
            navigate("/login") 
          },5000)
        }
      } catch (error) {
        console.log(error.message)
      }
      
    }

  return (
    <div className={styles.sidebar}  id="dashboard-sidebar">
      <div className={styles.iconbox}><CloseIcon onClick={closeSidebar} sx={{ fontSize: 26 }} /></div>
        <div className={styles.logo}>
          Stipenny 
          </div>
        <div className={styles.panel}>
            <div className={styles.link}>
                <span className={styles.icon}><HomeIcon /></span>
               <a href="/dashboard">Home</a> 
            </div>
            <div className={styles.link}>
                <span className={styles.icon}></span>
               <a href="/transactions"><CurrencyExchangeIcon /> Transactions</a> 
            </div>
             <div className={styles.link}>
               <a href="/stipends"><FormatListBulletedIcon /> Stipends</a> 
            </div>
            <div className={styles.link}>
                <span className={styles.icon}></span>
               <a href="/bills"><PaidIcon /> Bills & Payment</a> 
            </div>

            <div className={styles.link}>
                <span className={styles.icon}></span>
               <a href="/bank"><CreditCardIcon /> Bank & Card</a> 
            </div>

            <div className={styles.link}>
                <span className={styles.icon}></span>
               <a href="/settings"><SettingsIcon /> Settings</a> 
            </div>
            <div className={styles.link}>
                <span className={styles.icon}></span>
               <a href="/logout" onClick={handleLogout}><PowerSettingsNewIcon/> Logout</a> 
            </div>
        </div>

        <div className={styles.profile}>
           <div className={ styles.name }>
             <AccountCircleIcon /> { user?.lastname + " " + user?.firstname }
           </div>
        </div>

    </div>
  )
}

export default Sidebar
