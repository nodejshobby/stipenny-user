import React, { useState } from 'react'
import AuthService from "../../services/Auth"
import { useDispatch,useSelector } from 'react-redux'
import { setNotification, setProcessingButton } from "../../reducers/stipennyReducer"
import { useNavigate } from 'react-router-dom'

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const initialFormValues = {firstname: '', lastname: '', email: '', password: '',  phone_number: '', password_confirmation: ''}
  const [formValues, setFormValues] = useState(initialFormValues)
  const [errors, setErrors] = useState([])


  const isProcessingForm = useSelector(state => state.stipenny.isProcessingForm)

  const handleFormChange = (e) =>{
    const { name, value } = e.target
    setFormValues({...formValues, [name]: value})
  }
  

  const handleRegister = async (e) =>{
    e.preventDefault()
    setErrors([])
    dispatch(setProcessingButton(true))

    try {
      const response  = await AuthService.register(formValues)
      if(response.status === 201){
        const message = "Registration is successful"
         dispatch(setNotification({ type: "success", message }))
        setTimeout(()=>{
          dispatch(setNotification(null))
        }, 5000)
        navigate("/login")
      }
    } catch (error) {
      if(error.response.status === 422){
        const errors = error.response.data.errors
        setErrors(errors)
    }else{
      dispatch(setNotification({ type: "error", message: "Something went wrong!" }))
      setTimeout(()=>{
          dispatch(setNotification(null))
      }, 5000)
    }
  }
  dispatch(setProcessingButton(false))
}

  return (
    <form autoComplete="off" className="h-100" onSubmit={handleRegister}>
      <div className="container h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-10 col-md-8 col-lg-6 bg-white py-5 px-4 rounded shadow-sm">
          <h1 className="fw-bold text-center mb-4">Create new account</h1>
          <div className="row mb-3">
            <div className="col">
              <input className="form-control" name="firstname" type="text" placeholder='First name' onChange={handleFormChange} value={formValues.firstname}/>
              { errors.firstname && <small className="text-danger">{ errors.firstname }</small>}
            </div>
            <div className="col">
              <input className="form-control" name="lastname"type="text" placeholder='Last name' onChange={handleFormChange} value={ formValues.lastname}/>
              { errors.lastname && <small className="text-danger">{ errors.lastname }</small>}
            </div>
          </div>
          <div className="form-group mb-3">
            <input className="form-control" name="email" type="email" placeholder='Email' onChange={handleFormChange} value={formValues.email}/>
            { errors.email && <small className="text-danger">{ errors.email }</small>}
          </div>
          <div className="form-group mb-3">
            <input className="form-control" name="phone_number" type="text" placeholder='Phone Number' onChange={handleFormChange} value={formValues.phonenumber}/>
            { errors.phone_number && <small className="text-danger">{ errors.phone_number }</small>}
          </div>
          <div className="form-group mb-3">
            <input className="form-control" name="password" type="password" placeholder='Password' onChange={handleFormChange} value={formValues.password}/>
            { errors.password && <small className="text-danger">{ errors.password }</small>}
          </div>
          <div className="form-group mb-4">
            <input className="form-control" name="password_confirmation" type="password" placeholder='Confirm Password' onChange={handleFormChange} value={formValues.confirmpassword}/>
          </div>
          <div className="d-flex flex-wrap justify-content-between align-items-center">
              <button type="submit" className="btn btn-primary fw-bold py-3 px-4" disabled={isProcessingForm && "disabled"}>Register</button>
              <span>Have an account? <a className="text-decoration-none" href="/login">Login</a></span>
          </div>
        </div>
      </div>
    </div>
    </form>
  )
}


export default Register