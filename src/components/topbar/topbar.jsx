import React from 'react'
import styles from './topbar.module.css'
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

function Topbar() {
  const showSidebar = ()=>{
    const SideBar = document.getElementById("dashboard-sidebar");
    const DashboardContent = document.getElementById("user-layout-content");
    SideBar.style.display = "flex";
    DashboardContent.style.opacity = 0.4;
  }
    return (
    <div className={`${styles.topbar} shadow-sm`}>
      <div className={styles.left}><MenuIcon onClick={showSidebar} /></div>
      <div className={styles.right}>
        <Badge badgeContent={4} color="primary">
          <NotificationsNoneIcon />
        </Badge>
      </div>
    </div>
  )
}

export default Topbar