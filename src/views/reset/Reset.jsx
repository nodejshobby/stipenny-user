import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { setNotification, setProcessingButton } from '../../reducers/stipennyReducer'
import { useNavigate } from 'react-router-dom'
import Auth from '../../services/Auth'

function Reset() {
    const [errors, setErrors] = useState([])
    const [password, setPassword] = useState("")
    const [password_confirmation, setPasswordConfirmation] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [ queryParams ] = useSearchParams()

    const email = queryParams.get("email")
    const token = queryParams.get("token")

    useEffect(() => {
        if(!email || !token) {
            navigate("/login")
         }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

   


    const isProcessingForm = useSelector( state => state.stipenny.isProcessingForm )
    

    const handleReset = async (e) => {
        e.preventDefault()
        setErrors([])
        dispatch(setProcessingButton(true))

        try {
            const data = {
                token,
                email,
                password,
                password_confirmation,
            }

            const response = await Auth.reset(data)

            if(response.status === 200){
                dispatch(setNotification({type: "success", message: "Password is successfully updated"}))
                setTimeout(()=>{
                    dispatch(setNotification(null))
                    navigate("/login")
                }, 5000)
            }
        }catch(error){
            if(error.response.status === 422){
                const errors = error.response.data.errors
                setErrors(errors)
            }
        if(error.response.status === 400){
            dispatch(setNotification({ type: "error", message: error.response.data.message }))
            setTimeout(()=>{
                dispatch(setNotification(null))
            }, 5000)
        }
        else{
            dispatch(setNotification({ type: "error", message: "Something went wrong!" }))
            setTimeout(()=>{
                dispatch(setNotification(null))
            }, 5000)
        }
        }
        dispatch(setProcessingButton(false))
    }

   return (
    <form autoComplete="off" className="h-100" onSubmit={handleReset}>
      <div className="container h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-10 col-md-8 col-lg-5 bg-white py-5 px-4 rounded shadow-sm">
          <h2 className="fw-bold text-center mb-4">Reset your password</h2>
          <div className="form-group mb-3">
            <input name="password" className="form-control" type="password" placeholder='Enter your new password' onChange={(e) => setPassword(e.target.value)}/>
            {errors.password && <small className="text-danger">{errors.password}</small>}
          </div>
          <div className="form-group mb-4">
            <input name="password_confirmation" className="form-control" type="password" placeholder='Re-enter your new password' onChange={(e) => setPasswordConfirmation(e.target.value)}/>
            {errors.password_confirmation && <small className="text-danger">{errors.password_confirmation}</small>}
          </div>
          <div className="d-flex flex-wrap justify-content-between align-items-center">
              <button type="submit" className="btn btn-primary fw-bold py-3 px-4" disabled={isProcessingForm && "disabled" }>Reset</button>
          </div>
        </div>
      </div>
    </div>
    </form>
  )
}

export default Reset