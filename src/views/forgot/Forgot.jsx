import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification, setProcessingButton } from '../../reducers/stipennyReducer'
import Auth from '../../services/Auth'

function Forgot() {
    const [errors, setErrors] = useState([])
    const [email, setEmail] = useState("")
    const isProcessingForm = useSelector(state => state.stipenny.isProcessingForm)
    const dispatch = useDispatch()

    const handleForgot = async (e) => {
        e.preventDefault()
        setErrors([])
        dispatch(setProcessingButton(true))

        try{
            const data = {email}
            const response = await Auth.forgot(data);
            if(response.status === 200){
                dispatch(setNotification({ type: "success", message: "Reset link is successfully sent to your email"}))
                setTimeout(()=>{
                    dispatch(setNotification(null))
                }, 5000)
            }

        }catch(error){
            if(error.response.status === 422){
                const errors = error.response.data.errors
                setErrors(errors)
            }
        }

        dispatch(setProcessingButton(false))
    }

  return (
    <form autoComplete="off" className="h-100" onSubmit={handleForgot}>
      <div className="container h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-10 col-md-8 col-lg-6 bg-white py-5 px-4 rounded shadow-sm">
          <h1 className="fw-bold text-center mb-4">Forgot your password</h1>
          <div className="form-group mb-4">
            <input name="email" className="form-control" type="email" placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} required/>
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>
          <div className="d-flex flex-wrap justify-content-between align-items-center">
              <button type="submit" className="btn btn-primary fw-bold py-3 px-4" disabled={isProcessingForm && "disabled" }>Forgot</button>
          </div>
        </div>
      </div>
    </div>
    </form>
  )
}

export default Forgot