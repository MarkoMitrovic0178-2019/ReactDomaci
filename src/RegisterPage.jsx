import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
const RegisterPage = () => {
    const navigate=useNavigate();
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

    const handleSubmit = (e) => {
        e.preventDefault();
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
