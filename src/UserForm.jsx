import React, { useState } from 'react';
import './UserForm.css';
import dietPlans from './DietPlans';
import { useNavigate } from 'react-router-dom'; 
function UserForm(props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    weight: '',
    activityLevel: '',
    goal: '',
    medicalConditions: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let dietPlan = '';
    const age = parseInt(formData.age);
    if (age < 40) {
      dietPlan = 'Young Users (Less than 40)';
    } else if (age >= 40 && age <= 60) {
      dietPlan = 'Middle-Aged Users (Between 40 and 60)';
    } else {
      dietPlan = 'Elderly Users (Over 60)';
    }
   
    const userGoal = formData.goal;
    const filteredPlans = dietPlans.find(plan => plan.userGroup === dietPlan &&
       plan.type.toLowerCase().includes(userGoal.toLowerCase()));

    if (filteredPlans) {
      
      navigate('/filtered-plans', { state: { filteredPlans: filteredPlans } });

    } else {
      console.log('No matching diet plan found for the user');
    }
   
  };

  return (
    <div>
      <h2>Complete the form to get your personalised diet-plan!</h2>
      <form className='user-form-container' onSubmit={handleSubmit}>
        <div>
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} />
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
          <input type="number" name="activityLevel" value={formData.activityLevel} onChange={handleChange} />
        </div>
        <div>
          <label>Goals:</label>
          <select name="goal" value={formData.goal} onChange={handleChange}>
            <option value="slim down">Slim Down</option>
            <option value="get stronger">Get Stronger</option>
            <option value="maintain muscle mass">Maintain Muscle Mass</option>
          </select>
        </div>
        <div>
          <label>Medical Conditions:</label>
          <textarea name="medicalConditions" value={formData.medicalConditions} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserForm;
