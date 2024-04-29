import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './FilteredPlansPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';


function FilteredPlansPage({addMeals, meals, token, userId}) {
  const navigate=useNavigate();
  // const location = useLocation();
  // const { state } = location;
  const[dietPlans,setDietPlans]= useState([]);
  const [showDetailsId, setShowDetailsId] = useState(null);
  // const filteredPlan = state ? state.filteredPlans : null;

  const [showDetails, setShowDetails] = useState(false);

 
  const toggleDetails = (dietPlanId) => {
    if (showDetailsId === dietPlanId) {
      // If details are already shown for this diet plan, hide them
      setShowDetailsId(null);
    } else {
      // Otherwise, show details for the selected diet plan
      fetchMealsForDietPlan(dietPlanId);
      setShowDetailsId(dietPlanId);
    }
   
  };

  // if (!filteredPlan) {
  //   return <div>No filtered plans found</div>;
  // }

  

  const handleSavePlan = (dietPlanId) => {
    if(userId){
      window.sessionStorage.setItem("diet_plan_id", dietPlanId);
      axios.put(`/api/users/${userId}`, {diet_plan_id:window.sessionStorage.getItem("diet_plan_id")}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        console.log(response.data);
        alert("You have successfully saved your meals");
      }).catch((error) => {
        console.error(error);
      });
    }else{
      alert("You must be logged in to save your plan");
    }
   


  };


  useEffect(() => {
    console.log(token);
    if(window.sessionStorage.getItem("goals")!==undefined){
      axios.get(`api/dietPlans/goal/${window.sessionStorage.getItem("goals")}`).then((res)=>{
        console.log(res.data);
        setDietPlans(res.data.dietPlans);
        console.log('Type of dietPlans:', typeof dietPlans);
  
      }).catch(error => {
                console.error('Error fetching diet plans:', error);
                navigate("/user-form");
            });
    }
    
          

  }, []);

  const fetchMealsForDietPlan = (dietPlanId) => {
    console.log(dietPlanId);
    axios.get(`api/dietPlans/${dietPlanId}/meals`)
      .then((res) => {
        const mealsData = res.data.meals;
        if (Array.isArray(mealsData)) {
          console.log(mealsData);
          addMeals(mealsData);
        } else {
          console.error('Error: mealsData is not an array');
        }
      })
      .catch(error => {
        console.error('Error fetching meals:', error);
      });
  };


  return (
    <div className="card-container">
      {dietPlans && dietPlans.map(dietPlan => (
        <div key={dietPlan.id} className="card">
          <div className="card-body">
            <h5 className="card-title">{dietPlan.name}</h5>
            <p className="card-text">{dietPlan.description}</p>
            <p className="card-text">Duration: {dietPlan.duration}</p>
            <p className="card-text">Total Calories: {dietPlan.total_calories}</p>
            <p className="card-text">Carbohydrates Percentage: {dietPlan.carbohydrates_percentage}</p>
            <p className="card-text">Proteins Percentage: {dietPlan.proteins_percentage}</p>
            <p className="card-text">Fats Percentage: {dietPlan.fats_percentage}</p>
            <button onClick={() => toggleDetails(dietPlan.id)}>
              {showDetailsId === dietPlan.id ? 'Hide Details' : 'Show Details'}
            </button>
            {showDetailsId === dietPlan.id && meals &&(
              <div className="meal-container">
                <h4>Meals</h4>
                <ul>
                  {meals.map((meal) => (
                    <div  key={meal.id} className="meal">
                      <h5 className="card-title">{meal.name}</h5>
                      <p className="card-text">{meal.description}</p>
                      <p className="card-text">Calories: {meal.calories}</p>
                      <p className="card-text">Carbohydrates: {meal.carbohydrates}</p>
                      <p className="card-text">Proteins: {meal.proteins}</p>
                      <p className="card-text">Fats: {meal.fats}</p>
                      <p className="card-text">Fiber: {meal.fiber}</p>
                    </div>
                  ))}
                </ul>
              </div>
            )}
            <button onClick={() => handleSavePlan(dietPlan.id)}>
              Save Meals
            </button>
          </div>
        </div>
      ))}
    </div>
  );
  
}
export default FilteredPlansPage;