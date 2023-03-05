import React, { useState, useEffect } from 'react'
import { setUser, setToken } from "../../reducers/authReducer"
import { setNotification, setProcessingButton } from "../../reducers/stipennyReducer"
import { useDispatch, useSelector } from "react-redux"
import AuthService from "../../services/Auth"
import { useNavigate } from "react-router-dom"


function Login() {
  const StoreToken = useSelector((state) => state.auth.token )
  const StoreUser = useSelector((state) => state.auth.user )
  const isProcessingForm = useSelector(state => state.stipenny.isProcessingForm)
  const initialFormValues = {userId: '', password: ''}
  const [formValues, setFormValues] = useState(initialFormValues)
  const [errors, setErrors] = useState([])

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleFormChange = (e) =>{
    const { name, value } = e.target
    setFormValues({...formValues, [name]: value})
  }

  useEffect(()=>{
    if(StoreToken && StoreUser){
      navigate("/dashboard")
    }
  },[])
  

  const handleLogin = async (e) =>{
    e.preventDefault()
    setErrors([])
    dispatch(setProcessingButton(true))

    try {
      const response  = await AuthService.login(formValues)
      if(response.status === 200){
        const message = "Login is successful"
        const { token, user } = response.data;

        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        dispatch(setToken(token))
        dispatch(setUser(user))
        dispatch(setNotification({ type: "success", message }))

        setTimeout(()=>{
          dispatch(setNotification(null))
          navigate("/dashboard")
        }, 5000)
        
      }
    } catch (error) {
      if(error.response.status === 422){
        const errors = error.response.data.errors
        setErrors(errors)
    }
    if(error.response.status === 404){
         dispatch(setNotification({ type: "error", message: error.response.data.message }))
        setTimeout(()=>{
          dispatch(setNotification(null))
        }, 5000)
    }
    else{
      dispatch(setNotification({ type: "error", message: "Something went wrong!" }))
      console.log(error)
      setTimeout(()=>{
          dispatch(setNotification(null))
      }, 5000)
    }
}
  dispatch(setProcessingButton(false))
}


  return (
    <form autoComplete="off" className="h-100" onSubmit={handleLogin}>
      <div className="container h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-10 col-md-8 col-lg-6 bg-white py-5 px-4 rounded shadow-sm">
          <h1 className="fw-bold text-center mb-4">Enter your details</h1>
          <div className="form-group mb-3">
            <input name="userId" className="form-control" type="text" placeholder='Email or Phone number' onChange={handleFormChange} />
            {errors.userId && <small className="text-danger">{errors.userId}</small>}
          </div>
          <div className="form-group mb-3">
            <input name="password" className="form-control" type="password" placeholder='Password' onChange={handleFormChange} />
            {errors.password && <small className="text-danger">{errors.password}</small>}
          </div>
          <div className="d-flex justify-content-end">
            <a className="text-decoration-none" href="/forgot">Forgot password</a>
          </div>
          <div className="d-flex flex-wrap justify-content-between align-items-center">
              <button type="submit" className="btn btn-primary fw-bold py-3 px-4" disabled={isProcessingForm && "disabled" }>Login</button>
              <span>Don't have an account? <a className="text-decoration-none" href="/register">Register</a></span>
          </div>
        </div>
      </div>
    </div>
    </form>
  )
}

export default Login