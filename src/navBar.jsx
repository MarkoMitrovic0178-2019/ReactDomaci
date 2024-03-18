import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';


function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/log-in" className="nav-link">Log in</Link>
        </li>
        <li className="nav-item">
          <Link to="/user-form" className="nav-link">Get Your Diet Plan</Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link">Profile</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

