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
import ForgotPaswordPage from './ForgotPassword';



function App() {
  // const [currentUser, setCurrentUser] = useState(null);
  const[token,setToken]=useState();
  const[meals,SetMeals]=useState([]);
  const[userId,SetUserId]=useState();
 

  function addUserId(user_id){
    SetUserId(user_id);
  }
 function addToken(auth_token){
    setToken(auth_token);
  }
  const addMeals = (meals) => {
    SetMeals([...meals]);
};


  return (
    <BrowserRouter>
      <Navbar token={token} addToken={addToken} addUserId={addUserId}/>
      <Routes>
       
        <Route path="/user-form" element={<UserForm userId={userId} token={token}/>} />
      
        <Route path="/log-in" element={<LoginPage addToken={addToken} addUserId={addUserId}/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        {token ? (
          <Route path="/profile" element={<ProfilePage addMeals={addMeals} addUserId={addUserId} userId={userId} meals={meals} addToken={addToken} token={token}/>} />
        ) : (
          <Route path="/profile" element={<Navigate to="/log-in" />} />
        )}

          <Route path="/filtered-plans" element={<FilteredPlansPage addMeals={addMeals} addUserId={addUserId} userId={userId} token={token} meals={meals}/>} />
       <Route path="/forgotPassword" element={<ForgotPaswordPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
