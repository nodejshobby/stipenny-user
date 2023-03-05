import React from 'react'
import styles from "./dashboard.module.css"
import Balance from '../../components/balance'
import CreateStipend from '../../components/createstipend'
import RecentTransaction from '../../components/recenttransaction'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"



function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate()
  

  return (
    <div className={styles.content}>
      {/* Balance  */}
      <Balance  user={user}/>

      {/* Create Stipend  & transaction */}

       <div className="row justify-content-center align-item-center mt-2 mb-4 mx-lg-3 g-4 g-lg-3">
        {/* Stipend */}
        
        <CreateStipend />
        {/* Transaction */}
        
        <RecentTransaction />

       </div>
    </div>
  )
}

export default Dashboard
