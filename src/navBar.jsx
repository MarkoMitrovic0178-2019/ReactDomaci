import React from 'react';
import './Navbar.css';


function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="/" className="nav-link">Home</a>
        </li>
        <li className="nav-item">
          <a href="/diet-plans" className="nav-link">Diet Plans</a>
        </li>
        <li className="nav-item">
          <a href="/user-form" className="nav-link">Get Your Diet Plan</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

