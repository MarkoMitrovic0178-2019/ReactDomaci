import './LoginPage.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { v4 as uuidv4 } from 'uuid'; 

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
        
        if (storedUserData && storedUserData.email === formData.email && storedUserData.password === formData.password) {
            
            const uniqueId = uuidv4();

            
            const userDataWithId = { ...storedUserData, id: uniqueId };

            localStorage.setItem('currentUser', JSON.stringify(userDataWithId));
                console.log(userDataWithId.id); 
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
