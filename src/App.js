import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import RegisterPage from './RegisterPage';
import UserForm from './UserForm';
import FilteredPlansPage from './FilteredPlans';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import { useState } from 'react';
import { useEffect } from 'react';


function App() {
  const [currentUser, setCurrentUser] = useState(null);

  
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(storedUserData);
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/user-form" element={<UserForm />} />
        <Route path="/log-in" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        {currentUser ? (
          <Route path="/profile" element={<ProfilePage />} />
        ) : (
          <Route path="/profile" element={<Navigate to="/log-in" />} />
        )}
        <Route path="/filtered-plans" element={<FilteredPlansPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
