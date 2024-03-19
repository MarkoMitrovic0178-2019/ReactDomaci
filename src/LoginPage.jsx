import './LoginPage.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 


const LoginPage = () => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const storedUserData = JSON.parse(localStorage.getItem('userData'));
        console.log(storedUserData);
        if (storedUserData && storedUserData.email === formData.email && storedUserData.password === formData.password) {
            localStorage.setItem('currentUser', JSON.stringify(storedUserData));
            console.log(localStorage.getItem('currentUser'));
            alert('Login successful!');
            navigate('/profile');
        } else {
            alert('Invalid email or password. Please try again.');
        }
    };

    const handleRegisterClick = () => {
       navigate('/register');
    };

    return (
        <div className='login-container'>
            <h2>Login</h2>
            <div className='login-form'>
                <form  onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                <br />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                <br />
                <button type="submit">Login</button>
                <button type="button" onClick={handleRegisterClick}>Register</button>
            </form>
            </div>
            
        </div>
    );
}

export default LoginPage;
