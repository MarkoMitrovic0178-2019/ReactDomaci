import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Navbar({token, addToken, addUserId}) {

  const navigate=useNavigate();

  function handleLogout(){
    console.log("first");
    var config = {
      method:"post",
      url: "api/logout",
      headers:{
        Authorization: "Bearer "+token,
      },
    };

    axios(config).then(function(response){
      console.log(JSON.stringify(response.data));
      window.sessionStorage.setItem("auth_token",null);
      window.sessionStorage.setItem("goals",null);
      if(window.sessionStorage.getItem("admin")!==0){
        window.sessionStorage.setItem("admin",0);
      }
      
      addToken(null);
      addUserId(null);
      navigate("/");
    }).catch(function(error){
      console.log(error);
    });
  }
  return (
        <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        {token==null?( <li className="nav-item">
          <Link to="/log-in" className="nav-link">Log in</Link>
        </li>):
        (<a className="nav-link" href='#' onClick={handleLogout}>Logout</a>)
        }
       <li className="nav-item">
          <Link to="/user-form" className="nav-link">Get Your Diet Plan</Link>
      </li>
      <li className="nav-item">
          <Link to="/profile" className="nav-link">Profile</Link>
      </li>
      <li className="nav-item">
          <Link to="/filtered-plans" className="nav-link">Your Recommended Plan</Link>
      </li>
      </ul>
    </nav>
  );
}

export default Navbar;

