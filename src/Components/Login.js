import React from 'react'
import axios from "axios";
import { useNavigate} from "react-router-dom";
import { useState } from "react";
import { Nav } from 'react-bootstrap';

const Login = () => {
    const Navigate=useNavigate();
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
    }
    const LoginUser = (e) =>
    {
        e.preventDefault()
        const data={
        email:email,
        password:password
        }
        axios.post("http://localhost:8083/user/signin",data).then(response=>{
        localStorage.setItem('token',response.data.token)
        if(response.data.status=="sucess")
        {
        alert("Successfully Login");
        Navigate('/')
        }
    }).catch(()=>{
        alert("Wrong Crediantls");
    })
        
    
        
        
    }
  return (
    <div className="form">
    <div className="form-body">
    <div className="email">
            <label className="form__label" for="email">Email </label>
            <input  type="email" id="email" className="form__input" placeholder="Email"  onChange = {(e) => handleInputChange(e)} value={email}/>
        </div>
        <div className="password">
            <label className="form__label" for="password">Password </label>
            <input className="form__input" type="password"  id="password" placeholder="Password"  onChange = {(e) => handleInputChange(e)} value={password}/>
        </div>
        
        </div>
    <div class="footer">
        <button type="submit" class="btn" onClick={LoginUser}>Submit</button>
    </div>
    </div>
    
  )
}

export default Login