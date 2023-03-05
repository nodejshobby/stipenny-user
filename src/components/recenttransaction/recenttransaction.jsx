import React from 'react'

function RecentTransaction() {
  return (
    <div className="col-11 col-lg-6">
              <div className="shadow-sm rounded bg-white p-4">
              <h4 className="mb-4 fw-bold">Recent Transactions</h4>
              <div className="d-flex justify-content-between align-item-center py-1 mb-1">
                <div className="left">Withdrawal From Wallet</div>
                <div className="right">
                  <div className="date"><small>2021-02-28 08:41 PM</small></div>
                  <div className="text-danger fw-bold">-3,000</div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-item-center py-1 mb-1">
                <div className="left">Withdrawal From Wallet</div>
                <div className="right">
                  <div className="date"><small>2021-02-28 08:41 PM</small></div>
                  <div className="text-danger fw-bold">-3,000</div>
                </div>
              </div>

              <div className="d-flex justify-content-between align-item-center py-1 mb-1">
                <div className="left">Deposit to Wallet</div>
                <div className="right">
                  <div className="date mb-1"><small>2021-02-28 08:41 PM</small></div>
                  <div className="text-success fw-bold">+2,000</div>
                  </div>
              </div>
              <div className="d-flex justify-content-between align-item-center py-1 mb-1">
                <div className="left">Deposit to Wallet</div>
                <div className="right">
                  <div className="date mb-1"><small>2021-02-28 08:41 PM</small></div>
                  <div className="text-success fw-bold">+2,000</div>
                  </div>
              </div>
              <div className="d-flex justify-content-between align-item-center py-1 mb-1">
                <div className="left">Deposit to Wallet</div>
                <div className="right">
                  <div className="date mb-1"><small>2021-02-28 08:41 PM</small></div>
                  <div className="text-success fw-bold">+2,000</div>
                  </div>
              </div>
                  
            </div>
          
        </div>
  )
}

export default RecentTransaction