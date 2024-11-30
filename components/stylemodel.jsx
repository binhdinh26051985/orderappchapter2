import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link , useNavigate} from 'react-router-dom'
//const anvigate = useNavigate()

const Stylemodel = () => {
    // Cache out buttons container, and all of the panels
const buttons = document.querySelector('.buttons');
const panels = document.querySelectorAll('.panels');

// Add an event listener to the buttons container 
buttons?.addEventListener('click', handleClick);

// When a child element of `buttons` is clicked
function handleClick(e) {
 
  // Check to see if its a button
  if (e.target.matches('button')) {

    // For every element in the `panels` node list use `classList`
    // to remove the show class
    panels.forEach(panel => panel.classList.remove('show'));

    // "Destructure" the `id` from the button's data set
    const { id } = e.target.dataset;

    // Create a selector that will match the corresponding
    // panel with that id. We're using a template string to
    // help form the selector. Basically it says find me an element
    // with a "panel" class which also has an id that matches the id of
    // the button's data attribute which we just retrieved.
    const selector = `.panels[id="${id}"]`;

    // Select the `div` and, using classList, again add the
    // show class
    document.querySelector(selector).classList.add('show');
    }

    }
    const [cust1, setCust1] = useState([]);
    const [cust, setCust] = useState();
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
  //add customer:

  const handleSubmitCus = (event) => {
    event.preventDefault()
    axios.post('http://localhost:3000/employee/add_cust', {cust})
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
      .get("http://localhost:3000/employee/cust")
      .then((result) => {
        if (result.data.Status) {
            setCust1(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
        
        <div className="panel">
            <div className="panel-header">
                Style Management
            </div>

        </div>
        <div>
            <div className="navbar">
            <div className="buttons">
                  <a><button data-id="myorders" className="btn btn-primary w-100">Group</button></a>
                  <a><button data-id="myproducts" className="btn btn-success">Customer</button></a>
                  <a><button data-id="mysupplier" className="btn btn-primary">Detail</button></a>
            </div>
            </div>
              <div className="panels" id="myorders">
                  <section>

                      <div className="item pri">
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

                      <div className="item sec">
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
              
              <div className="panels" id="myproducts">
                
                <section>

                      <div className="item pri">
                          <div className="mt-3">
                              <table className="table">
                                  <thead>
                                      <tr>
                                          <th>Customer</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {cust1.map((e) => (
                                          <tr>
                                              <td>{e.name}</td>
                                          </tr>
                                      ))}
                                  </tbody>
                              </table>
                          </div>
                      </div>

                      <div className="item sec">
                          <div className=''>
                              <div className='d-flex justify-content'>
                                  <div className=''>

                                      <h2>Add Customer</h2>
                                      <form onSubmit={handleSubmitCus}>
                                          <div className='mb-3'>
                                              <input type="text" name='cust' autoComplete='off' placeholder='Input Customer'
                                                  onChange={(e) => setCust(e.target.value)} className='form-control rounded-0' />
                                          </div>
                                          <button className='btn btn-success w-100 rounded-0 mb-2'>Add</button>

                                      </form>
                                  </div>
                              </div>
                          </div>
                      </div>

                  </section>
                </div>
              <div className="panels" id="mysupplier">
                  <p>Amazon, E-kart</p>
                  
              </div>
          </div>
    </div>
  )
}

export default Stylemodel