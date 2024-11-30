import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Addgmt = () => {
    const [styledt, setStyledt] = useState([]);
    //const navigate = useNavigate()
  
    useEffect(() => {
      axios
        .get("http://localhost:3000/employee/styles")
        .then((result) => {
          if (result.data.Status) {
            setStyledt(result.data.Result);
          } else {
            alert(result.data.Error);
          }
        })
        .catch((err) => console.log(err));
    }, []);

    const LoadTecpack = (id) =>{
      axios.get('http://localhost:3000/employee/tpack/' + id),
      axios({
        url: 'http://localhost:3000/employee/tpack/' + id, //your url
        method: 'GET',
        responseType: 'blob', // important
    }).then((response) => {
        // create file link in browser's memory
        const href = URL.createObjectURL(response.data);
    
        // create "a" HTML element with href to file & click
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', 'Teckpack.pdf'); //or any other extension
        document.body.appendChild(link);
        link.click();
    
        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    });
      
    }
    const handleDelete = (id) => {
      axios.delete('http://localhost:3000/auth/delete_employee/' + id)
        .then(result => {
          if (result.data.Status) {
            window.location.reload()
          } else {
            alert(result.data.Error)
          }
        })
    }
    return (
        <div className="px-5 mt-3">
            <div className="d-flex justify-content-center">
                <h3>Style Detail</h3>
            </div>
            <Link to="/user/add_style" className="btn btn-success">
                Add Style
            </Link>
            <div className="mt-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Styel#</th>
                            <th>Name</th>
                            <th>Customer</th>
                            <th>Style Group</th>
                            <th>Image</th>
                            <th>Teckpack</th>
                            <th>Posted date</th>

                        </tr>
                    </thead>
                    <tbody>
                        {styledt.map((e) => (
                            <tr>
                                <td>{e.styelno}</td>
                                <td>{e.name}</td>
                                <td>{e.cust_id}</td>
                                <td>{e.groupstyle_id}</td>
                                <td>
                                    <img
                                        src={`http://localhost:3000/Images/` + e.image}
                                        className="employee_image"
                                    />
                                    
                                </td>
                                <td>{e.postdate}</td>            
                                <td>
                                    <Link
                                        to={`/dashboard/edit_employee/` + e.id}
                                        className="btn btn-info btn-sm me-2"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() => handleDelete(e.id)}> Delete
                                    </button>
                                    
                                    
                                </td>
                                <td><button onClick={() => LoadTecpack(e.id)} >Teckpack</button></td>
                            </tr>
                            
                        ))}
                  </tbody>
                </table>
                
            </div>
        </div>
    );
  
};

export default Addgmt;