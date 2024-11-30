import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Addstyle = () => {
  const [adstyle, setAdstyle] = useState({
    styleno: "",
    name: "",
    cust_id: "",
    groupstyle_id: "",
    image: "",
    techpack: "",
    postdate: ""
  });
  const [customer, setCustomer] = useState([]);
  const [groupstyle, setGroup] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3000/employee/cust")
      .then((result) => {
        if (result.data.Status) {
          setCustomer(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
    

  useEffect(() => {
    axios
      .get("http://localhost:3000/employee/gmtlist")
      .then((result) => {
        if (result.data.Status) {
          setGroup(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('styleno', adstyle.styleno);
    formData.append('name', adstyle.name);
    formData.append('cust_id', adstyle.cust_id);
    formData.append('groupstyle_id', adstyle.groupstyle_id);
    formData.append('image', adstyle.image);
    formData.append('techpack', adstyle.techpack);
    formData.append('postdate', adstyle.postdate);

    axios.post('http://localhost:3000/employee/add_style', formData)
    .then(result => {
        if(result.data.Status) {
            navigate('/user/stylemode')
        } else {
            alert(result.data.Error)
        }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">NEW STYLE</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="styleno" className="form-label">
              Style Number
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="styleno"
              placeholder="input style#"
              onChange={(e) =>
                setAdstyle({ ...adstyle, styleno: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="stylename" className="form-label">
              Style Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="name"
              placeholder="input style name"
              onChange={(e) =>
                setAdstyle({ ...adstyle, name: e.target.value })
              }
            />
          </div>
          
          <div className="col-12">
            <label htmlFor="customer" className="form-label">
              Customer
            </label>
            <select name="customer" id="customer" className="form-select"
                onChange={(e) => setAdstyle({...adstyle, cust_id: e.target.value})}>
              {customer.map((c) => {
                return <option value={c.id}>{c.name}</option>;
              })}
            </select>
          </div>

          <div className="col-12">
            <label htmlFor="groupstyle" className="form-label">
              Style Group
            </label>
            <select name="groupstyle" id="groupstyle" className="form-select"
                onChange={(e) => setAdstyle({...adstyle, groupstyle_id: e.target.value})}>
              {groupstyle.map((c) => {
                return <option value={c.id}>{c.gmtype}</option>;
              })}
            </select>
          </div>

          <div className="col-12 mb-3">
            <label className="form-label" htmlFor="inputGroupFile01">
            Post Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image"
              onChange={(e) => setAdstyle({...adstyle, image: e.target.files[0]})}
            />
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" htmlFor="inputGroupFile02">
              Post Techpack file
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile02"
              name="techpack"
              onChange={(e) => setAdstyle({...adstyle, techpack: e.target.files[0]})}
            />
          </div>

          <div className="col-12">
            <label htmlFor="postdate" className="form-label">
              Style released date
            </label>
            <input
              type="date"
              className="form-control rounded-0"
              id="released"
              placeholder="Released date"
              onChange={(e) =>
                setAdstyle({ ...adstyle, postdate: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addstyle;