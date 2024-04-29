import { useNavigate } from "react-router-dom";
import './LoginPage.css'
import { useState } from "react";
import axios from "axios";
function ForgotPaswordPage(){

    const navigate=useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        axios.post(`api/users/password`,userData)
        .then((res) => {
          alert("Password changed successfully");
          console.log(res.data);
          navigate("/log-in");  

        })
        .catch(error => {
          console.error('Error fetching meals:', error);
          if(userData.password.length<8){
            alert("Password must have at least 8 characters");
          }
          else{
            alert("User not found");
          }
          
        });
    }


return (
    <div className='login-container'>
        <h2>Login</h2>
        <div className='login-form'>
            <form  onSubmit={handleChangePassword}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} required />
            <br />
            <label htmlFor="password">New Password:</label>
            <input type="password" id="password" name="password" value={userData.password} onChange={handleChange} required />
            <br />
            <button type="submit">Change Password</button>
            
        </form>
        </div>
        
    </div>
);
}
export default ForgotPaswordPage;