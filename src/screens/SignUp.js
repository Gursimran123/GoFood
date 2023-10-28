import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",geolocation:""});
    let navigate=useNavigate();

    const handleSubmit = async (e) =>{
       e.preventDefault();
       const response= await fetch("http://localhost:5000/api/createuser",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation})
       });
       const data=await response.json();
       console.log(data);

       if(!data.success){
        alert("enter valid credentials");
       }
       if(data.success){
        navigate('/')
       }
    }

    const onChange= (event) =>{
        setCredentials({...credentials,[event.target.name]:event.target.value})
    }
  return (
    <>
    <div className="container my-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name='name'
            value={credentials.name}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name='email'
            value={credentials.email}
             onChange={onChange}
          />
          {/* <div id="emailHelp" className="form-text">
          </div> */}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name='password'
            value={credentials.password}
             onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name='geolocation'
            value={credentials.geolocation}
             onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
        <Link to='/login' className="m-3 btn btn-danger">Already a User</Link>
      </form>
      </div>
    </>
  );
}
