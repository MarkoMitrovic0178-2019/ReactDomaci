import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
// import DietPlansPage from './DietPlansPage';
import UserForm from './UserForm';
import FilteredPlansPage from './FilteredPlans';
import HomePage from './HomePage';
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/user-form" element={<UserForm/>} />
        <Route path="/" element={<HomePage/>} />
        <Route  path="/filtered-plans" element={<FilteredPlansPage/>}/>
            </Routes>
    </BrowserRouter>
  );

}

export default App;
