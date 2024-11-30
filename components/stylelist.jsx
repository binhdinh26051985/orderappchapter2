import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Stylelist = () => {
  const [types, setTypes] = useState([]);
  const [values, setValues] = useState({
    gmtype: '',
    des: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post('http://localhost:3000/employee/add_gmtype', values)
    .then(result => {
      if(result.data.Status) {
          window.location.reload()
      } else {
          alert(result.data.Error)
      }
    })
    .catch(err => console.log(err))
  }
  //const navigate = useNavigate()
  useEffect(() => {
    axios
      .get("http://localhost:3000/employee/gmtlist")
      .then((result) => {
        if (result.data.Status) {
          setTypes(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className=''>
      
      <section>

        <div class="item pri">
        <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Garment type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {types.map((e) => (
              <tr>
                <td>{e.gmtype}</td>
                <td>{e.des}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>

        <div class="item sec">
        <div className=''>
        <div className='d-flex justify-content'>
          <div className=''>

            <h2>ADD NEW TYPE</h2>
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <input type="text" name='gmtype' autoComplete='off' placeholder='Input gmtype'
                  onChange={(e) => setValues({ ...values, gmtype: e.target.value })} className='form-control rounded-0' />
              </div>
              <div className='mb-3'>
                <input type="text" name='des' placeholder='Example'
                  onChange={(e) => setValues({ ...values, des: e.target.value })} className='form-control rounded-0' />
              </div>
              <button className='btn btn-success w-100 rounded-0 mb-2'>Add</button>

            </form>
          </div>
        </div>
      </div>
        </div>

      </section>
    </div>
    

  )
}

export default Stylelist