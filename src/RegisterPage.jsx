import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; 
const RegisterPage = () => {
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        id:0
        });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const uniqueId=uuidv4();
        formData.id=uniqueId;
        localStorage.setItem('userData', JSON.stringify(formData));
        
        alert('Registration successful!');
        navigate('/log-in')

        
    };

    return (
        <div className='login-container'>
            <h2>Register</h2>
            <div className='login-form'>
                <form onSubmit={handleSubmit}>
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
