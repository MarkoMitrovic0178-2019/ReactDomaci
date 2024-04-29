import './LoginPage.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const LoginPage = ({addToken,addUserId}) => {
    const navigate= useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleForgotPassword = () => {
        navigate("/forgotPassword");
    }

    const handleLogin = (e) => {
        e.preventDefault();
        
        
        axios.post("api/login", formData).then((res)=>
        {
            console.log(res.data);
            if(res.data.success===true){
                window.sessionStorage.setItem("auth_token",res.data.access_token);
                console.log(res.data);
                addUserId(res.data.user_id);
                window.sessionStorage.setItem("diet_plan_id", res.data.diet_plan_id);
                addToken(res.data.access_token);
                if(formData.email==="mitrovicmarko327743@gmail.com"){
                    window.sessionStorage.setItem("admin",res.data.user_id);
                }
                alert('Login successful!');
                navigate('/profile');
            }
            else {
                alert('Invalid email or password. Please try again.');
            }
        }).catch((e)=>{
        console.log(e);
        alert("Invalid username or password.");
        });
        
    };

    const handleRegisterClick = () => {
       navigate('/register');
    };

    return (
        <div className='login-container'>
            <h2>Login</h2>
            <div className='login-form'>
                <form  onSubmit={handleLogin}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                <br />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                <br />
                <button type="submit">Login</button>
                <button type="button" onClick={handleRegisterClick}>Register</button>
                <button type="button" onClick={handleForgotPassword}>Forgoten Password</button>
            </form>
            </div>
            
        </div>
    );
}

export default LoginPage;
