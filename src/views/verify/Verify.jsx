import React, { useEffect, useState } from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate, useSearchParams } from 'react-router-dom'
import Auth from '../../services/Auth';

function Verify() {
    const [ queryParams ] = useSearchParams()
    const [verifyMessage, setVerifyMessage] = useState("")
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()
    const verify_url = decodeURIComponent(queryParams.get("verify_url")) 


    const verifyEmail = async ()=>{
        try{
            const response = await Auth.verify(verify_url)
            if(response.status === 200){
                setSuccess(true)
                setVerifyMessage(response.data.message)
            }
        }catch(error){
        if(error.response.status === 400){
           setVerifyMessage(error.response.data.message)
        }
        else{
            setVerifyMessage(error.response.data.message)
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
                        {!verifyMessage && <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>}
                        {success && <div className="icon mb-3"><TaskAltIcon sx={{ fontSize: 80, color: "#0000fe" }}/></div>} 
                        <h4 className='mb-4'>{ verifyMessage }</h4>
                        <a className="btn btn-primary py-3 px-4 fw-bold" href="/login">Login Now <LoginIcon /></a>
                    </div>
            </div>
        </div>  
    </div>
  )
}

export default Verify