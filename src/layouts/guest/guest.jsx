import React, { useEffect } from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import { Alert } from "@mui/material"
import { useSelector } from 'react-redux'

function Guest() {
  const message =  useSelector(state => state.stipenny.message)
  const user = useSelector(state => state.auth.user)
  const navigate = useNavigate()

  useEffect(()=>{
    if(user){
      navigate("/dashboard")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <>
    { message &&  <Alert severity={message.type} color={message.type} className="toast-right">
        {message.message}
      </Alert>
    }
      <Outlet />
    </>
  )
}

export default Guest