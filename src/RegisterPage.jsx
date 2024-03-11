// RegisterPage.jsx

import React, { useState } from 'react';

const RegisterPage = () => {
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
        // Save user data to local storage
        localStorage.setItem('userData', JSON.stringify(formData));
        alert('Registration successful!');
        // Redirect or perform further actions after registration
    };

    return (
        <div>
            <h2>Register</h2>
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
    );
}

export default RegisterPage;
