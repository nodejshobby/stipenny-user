import React from 'react'
import {Outlet} from 'react-router-dom'
import { Alert } from "@mui/material"
import { useSelector } from 'react-redux'

function Guest() {
  const message =  useSelector(state => state.stipenny.message)
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