import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; 
import axios from 'axios';
const RegisterPage = () => {
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        diet_plan_id:0
        });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("api/register", formData).then((res)=>
        {
            if(res.data.success===true){
                alert('Registration successful!');
                navigate('/log-in');
            }else
            {alert("Registration was not successful!");}
            console.log(res.data);
        }).catch((e)=>{
        console.log(e);
        });
  };

    return (
        <div className='login-container'>
            <h2>Register</h2>
            <div className='login-form'>
                <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="username" id="username" name="username" value={formData.username} onChange={handleChange} required />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                <br />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                <br />

                <button type="submit">Register</button>
            </form>
            </div>
            
        </div>
    );
}

export default RegisterPage;
