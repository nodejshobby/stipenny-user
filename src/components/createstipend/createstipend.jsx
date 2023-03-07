import React, { useState } from 'react'
import { setNotification, setProcessingButton } from "../../reducers/stipennyReducer"
import { useDispatch, useSelector } from "react-redux"
import stipendService from "../../services/Stipend"

function CreateStipend() {
  const dispatch = useDispatch()

  const initialFormValues = {title: '', amount: '',interval: 'daily', limit: ''}
  const [formValues, setFormValues] = useState(initialFormValues)
  const [errors, setErrors] = useState([])

  const isProcessingForm = useSelector(state => state.stipenny.isProcessingForm )

 const handleFormChange = (e) =>{
    const { name, value } = e.target
    setFormValues({...formValues, [name]: value})
  }

  const handleStipendCreate = async (e) => {
    e.preventDefault()
    dispatch(setProcessingButton(true))
    setErrors([])

    try {
      const response = await stipendService.create(formValues)
      if(response.status === 201){
        setFormValues(initialFormValues)
        dispatch(setNotification({type: "success", message: response.data.message }))
        setTimeout(() => {
          dispatch(setNotification(null))
        }, 5000);
      }
    } catch (error) {
       if(error.response.status === 422){
        const errors = error.response.data.errors
        setErrors(errors)
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
    <div className="col-11 col-lg-6">
              <div className="shadow-sm rounded bg-white p-4">
                    <h4 className="mb-4 fw-bold">Create Stipend Plan</h4>
                    <form onSubmit={handleStipendCreate}>
                      <div className="form-group mb-3">
                    <input name="title" className="form-control" type="text" placeholder="Stipend title" onChange={handleFormChange} value={formValues.title} required/>
                    {errors.title && <small className="text-danger">{errors.title}</small>}

                  </div>
                  <div className="form-group mb-3">
                    <input name="amount" className="form-control" type="number" placeholder="Stipend Single Amount" min={500} onChange={handleFormChange} value={formValues.amount} required/>
                    {errors.amount && <small className="text-danger">{errors.amount}</small>}
                  </div>
                  <div className="form-group mb-3">
                    <select name="interval" className="form-select" type="text" placeholder="Stipend Interval" onChange={handleFormChange} value={formValues.interval} required>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                    {errors.interval && <small className="text-danger">{errors.interval}</small>}
                  </div>
                  <div className="form-group mb-4">
                    <input name="limit" className="form-control" type="number" placeholder="Stipend Limit" min={1} onChange={handleFormChange} value={formValues.limit} required/>
                    {errors.limit && <small className="text-danger">{errors.limit}</small>}
                  </div>

                  <button type="submit" className="btn btn-primary fw-bold p-3" disabled={isProcessingForm && "disabled"}>Create</button>
                    </form>
                  
            </div>
          
        </div>
  )
}

export default CreateStipend