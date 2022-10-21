import { useState } from "react";
import React from 'react'
import axios from "axios";
import { useNavigate,Link} from "react-router-dom";


const Register = () => {
    const Navigate=useNavigate();

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);
    
    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "firstName"){
            setFirstName(value);
        }
        if(id === "lastName"){
            setLastName(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }

    }
    const registerUser = (e) =>
    {
        e.preventDefault()
        const data={
        email:email,
        firstName:firstName,
        lastName:lastName,
        password:password
        }
        axios.post("http://localhost:8083/user/signup",data).then(response=>{
        console.log(response)
        Navigate('/Login')})
        
        
    }
  return (
    <div className="form">
    <div className="form-body">
        <div className="username">
            <label className="form__label" for="firstName">First Name </label>
            <input className="form__input" type="text" id="firstName" placeholder="First Name"  onChange = {(e) => handleInputChange(e)} value={firstName}/>
        </div>
        <div className="lastname">
            <label className="form__label" for="lastName">Last Name </label>
            <input  type="text" name="" id="lastName"  className="form__input"placeholder="LastName"  onChange = {(e) => handleInputChange(e)} value={lastName}/>
        </div>
        <div className="email">
            <label className="form__label" for="email">Email </label>
            <input  type="email" id="email" className="form__input" placeholder="Email"  onChange = {(e) => handleInputChange(e)} value={email}/>
        </div>
        <div className="password">
            <label className="form__label" for="password">Password </label>
            <input className="form__input" type="password"  id="password" placeholder="Password"  onChange = {(e) => handleInputChange(e)} value={password}/>
        </div>
        <div className="confirm-password">
            <label className="form__label" for="confirmPassword">Confirm Password </label>
            <input className="form__input" type="password" id="confirmPassword" placeholder="Confirm Password"  onChange = {(e) => handleInputChange(e)} value={confirmPassword}
            />
        </div>
    </div>
    <div class="footer">
        <button type="submit" class="btn" onClick={registerUser}>Register</button>
        <Link className="btn" to={"/login"} >Login</Link>
        
    </div>
</div>      
     

  )
}

export default Register