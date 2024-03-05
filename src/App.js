import React from 'react';
import { BrowserRouter, Route, Switch, Routes } from 'react-router-dom';
import Navbar from './Navbar';
// import DietPlansPage from './DietPlansPage';
import UserForm from './UserForm';
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/user-form" element={<UserForm/>} />
        {/* <Route path="/DietPlans"/> */}
            </Routes>
    </BrowserRouter>
  );

}

export default App;
