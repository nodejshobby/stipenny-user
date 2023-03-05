import React from 'react'

function CreateStipend() {
  return (
    <div className="col-11 col-lg-6">
              <div className="shadow-sm rounded bg-white p-4">
                    <h4 className="mb-4 fw-bold">Create Stipend Plan</h4>
                  <div className="form-group mb-3">
                    <input className="form-control" type="text" placeholder="Stipend title" />
                  </div>
                  <div className="form-group mb-3">
                    <input className="form-control" type="number" placeholder="Stipend Single Amount" min={500} />
                  </div>
                  <div className="form-group mb-3">
                    <select className="form-select" type="text" placeholder="Stipend Interval">
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div className="form-group mb-4">
                    <input className="form-control" type="number" placeholder="Stipend Limit" min={1} />
                  </div>

                  <button className="btn btn-primary fw-bold p-3">Create</button>
            </div>
          
        </div>
  )
}

export default CreateStipend