import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import RegisterPage from './RegisterPage';
import UserForm from './UserForm';
import FilteredPlansPage from './FilteredPlans';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';

function App() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

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
