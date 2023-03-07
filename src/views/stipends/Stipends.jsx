import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setNotification } from '../../reducers/stipennyReducer';
import Stipend from '../../services/Stipend'

const columns = [
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'amount', headerName: 'Single Amount', type: 'number', width: 130 },
  { field: 'interval', headerName: 'Interval', width: 130 },
  { field: 'limit', headerName: 'Limit', type: 'number', width: 80},
  { field: 'status', headerName: 'Status', width: 90},
  { field: 'success_billed', headerName: 'Success Billed', type: 'number', width: 90},
  { field: 'failed_billed', headerName: 'Failed Billed', type: 'number', width: 90},
  { field: 'created_at', headerName: 'Created Date', type: 'date', width: 90},
  { field: 'due_date', headerName: 'Due Date', type: 'date', width: 90},
  { field: 'next_billing', headerName: 'Next Billing At', type: 'date', width: 90},
];


function Stipends() {
  const [stipends, setStipends] = useState("")
  const dispatch = useDispatch()


  const getStipends = async () => {
    try {
      const response = await Stipend.stipends();
      setStipends(response.data)
    } catch (error) {
      dispatch(setNotification({type: "error", message: "Something went wrong!"}))
      setTimeout(()=>{
        dispatch(setNotification(null))
      }, 5000)
    }
  }

  useEffect(()=>{
    getStipends()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="container-md">
      <h2 className="my-3">My Stipends</h2>
      <div className="row justify-content-center align-items-center">
        <div className="table-responsive">
          <div className="table">

          </div>
        </div>
      </div>
    </div>
  )
}

export default Stipends