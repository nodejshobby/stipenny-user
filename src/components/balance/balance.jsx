import styles from "./balance.module.css";
import BalanceIcon from '@mui/icons-material/WalletOutlined'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import React from 'react'

function Balance({user}) {
  
  return (
     <div className="row justify-content-center justify-content-lg-start align-item-center mt-4 ms-lg-3">
        <div className="col-11 col-lg-6">
          <div className="text-center bg-white py-5 px-4 shadow-sm rounded">
            <h5>Balance</h5>
            <h1 className={styles.balance}>{ user?.detail?.balance }</h1>
            <div className="d-flex flex-wrap justify-content-center align-items-center mt-3">
             <a href="#" className={`text-decoration-none me-4 ${styles.action}`}><AccountBalanceWalletIcon /> Transfer</a>
             <a href="#" className={`text-decoration-none ${styles.action}`}><BalanceIcon /> Deposit</a>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Balance