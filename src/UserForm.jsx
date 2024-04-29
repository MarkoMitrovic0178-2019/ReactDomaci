import React, { useState } from 'react';
import './UserForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function UserForm({token, userId}) {
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
    activity_level: '',
    goals: 'Weight Loss',
    medicalConditions: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the name is 'goals', directly update the formData
    if (name === 'goals') {
      setFormData(prevState => ({
        ...prevState,
        goals: value // Update goals field with the selected value
      }));
    } else {
      // For other fields, update formData as usual
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(token);
    console.log(userId);
    formData.height=parseFloat(formData.height);
    formData.weight=parseFloat(formData.weight);
    formData.activity_level=parseInt(formData.activity_level);
    formData.age=parseInt(formData.age);
    if(userId){
      axios.put(`/api/users/${userId}`, formData ,
      {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          console.log(response.data);
          const { goals, diet_plan_id } = response.data[1];
          console.log(goals);
          window.sessionStorage.setItem("goals", goals);
          window.sessionStorage.setItem("diet_plan_id", diet_plan_id);
          console.log(window.sessionStorage.getItem("goals")) ;
          navigate('/filtered-plans');
        });
    }
    else{
      window.sessionStorage.setItem("goals", formData.goals);
      navigate('/filtered-plans');
    }
    

  }
 
  
  

  return (
    <div className='user-form-container'>
      
      <form  onSubmit={handleSubmit}>
      <h2 >Complete the form to get your personalised diet-plan!</h2>
        <div>
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} />
        </div>
        <div>
          <label>Gender:</label>
          <input type="text" name="gender" value={formData.gender} onChange={handleChange} />
        </div>
        <div>
          <label>Height (cm):</label>
          <input type="number" name="height" value={formData.height} onChange={handleChange} />
        </div>
        <div>
          <label>Weight (kg):</label>
          <input type="number" name="weight" value={formData.weight} onChange={handleChange} />
        </div>
        <div>
          <label>Activity Level (times per week):</label>
          <input type="number" name="activity_level" value={formData.activity_level} onChange={handleChange} />
        </div>
        <div>
          <label>Goals:</label>
          <select name="goals" value={formData.goals} onChange={handleChange}>
            <option value="slim down">Weight Loss</option>
            <option value="get stronger">Gain Weight</option>
            <option value="maintain muscle mass">Maintain Muscle Mass</option>
          </select>
        </div>
        <div>
          <label>Medical Conditions:</label>
          <textarea  type="text" name="medicalConditions" value={formData.medicalConditions} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );

}
export default UserForm;
