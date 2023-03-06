import React, { useEffect, useState } from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate, useSearchParams } from 'react-router-dom'
import Auth from '../../services/Auth';
import { useDispatch } from 'react-redux';
import { setNotification } from '../../reducers/stipennyReducer';


function Verify() {
    const [ queryParams ] = useSearchParams()
    const [verifyMessage, setVerifyMessage] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const verify_url = queryParams.get("verify_url")

    const verifyEmail = async ()=>{
        try{
            const response = await Auth.verify(verify_url)
            if(response.status === 200){
                setVerifyMessage(response.data.message)
            }
        }catch(error){
        if(error.response.status === 400){
            dispatch(setNotification({ type: "error", message: error.response.data.message }))
            navigate("/login")
            setTimeout(()=>{
                dispatch(setNotification(null))
            }, 5000)
        }
        else{
            dispatch(setNotification({ type: "error", message: "Something went wrong!" }))
            navigate("/login")
            setTimeout(()=>{
                dispatch(setNotification(null))
            }, 5000)
            }
        }
    }

    useEffect(()=>{
        if(!verify_url){
            navigate("/login")
        }

        verifyEmail()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  return (

    <div className="container h-100">
        <div className="row justify-content-center align-items-center h-100">
            <div className="col-11 col-md-8 col-lg-6 text-center">
                    <div className='py-5 px-4 shadow-sm rounded bg-white text-center'>
                        {verifyMessage && <div className="icon mb-3"><TaskAltIcon sx={{ fontSize: 80, color: "#0000fe" }}/></div>} 
                        <h4 className='mb-4'>{ verifyMessage }</h4>
                        <a className="btn btn-primary py-3 px-4 fw-bold" href="/login">Login Now <LoginIcon /></a>
                    </div>
            </div>
        </div>  
    </div>
  )
}

export default Verify