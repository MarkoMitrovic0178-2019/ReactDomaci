import React, { useState , useEffect} from 'react';
import './ProfilePage.css';
import { Calendar } from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProfilePage({addMeals, meals, userId, addToken, token,addUserId}) {
  
  const navigate = useNavigate();

 
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mealData, setMealData] = useState({
    breakfast: { meal: '', weight: '', calories: '' },
    snack1: { meal: '', weight: '', calories: '' },
    lunch: { meal: '', weight: '', calories: '' },
    snack2: { meal: '', weight: '', calories: '' },
    dinner: { meal: '', weight: '', calories: '' }
  });

  
  const handleDateChange = (date) => {
    setSelectedDate(date);
    loadSavedMeals(date);
  };

  const loadSavedMeals = (date) => {
    const savedMeals = JSON.parse(localStorage.getItem(`mealData_${userId}_${date.toDateString()}`));
    if (savedMeals) {
      setMealData(savedMeals);
    } else {
      
      setMealData({
        breakfast: { meal: '', weight: '', calories: '' },
        snack1: { meal: '', weight: '', calories: '' },
        lunch: { meal: '', weight: '', calories: '' },
        snack2: { meal: '', weight: '', calories: '' },
        dinner: { meal: '', weight: '', calories: '' }
      });
    }
  };


  const handleMealDataChange = (e, mealType) => {
    const { name, value } = e.target;
    setMealData(prevState => ({
      ...prevState,
      [mealType]: {
        ...prevState[mealType],
        [name]: value
      }
    }));
  };

  
  

  const handleSaveMeals = () => {
    
      localStorage.setItem(`mealData_${userId}_${selectedDate.toDateString()}`, JSON.stringify(mealData));
      alert('Meal data saved successfully!');
    
  };


  const confirmDelete = () => {
    if (window.confirm('Are you sure you want to delete?')) {
      
      axios.delete(`api/users/${userId}`, {
        headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res)=>{
        addToken(null);
        addUserId(null);
        alert("User deleted successfully");
        navigate("/log-in");
      }).catch((error)=>{
        console.log(error);      
      });      
    } else {
      alert('Delete canceled');
    }
  }
  
  useEffect(() => {

    if(window.sessionStorage.getItem("diet_plan_id")!==0){
        axios.get(`api/dietPlans/${window.sessionStorage.getItem("diet_plan_id")}/meals`)
        .then((res) => {
          addMeals(res.data.meals);
          console.log(res.data.meals);
        })
        .catch(error => {
          console.error('Error fetching meals:', error);
        });
    }
            

   
  }, []); 
  

  
  
  return (
   
   

<div className="profile-container">
    <div className="profile-content">
        {window.sessionStorage.getItem("diet_plan_id") !==0 &&(
            <div className="card">
            <div className="card-body">
            <button onClick={confirmDelete}>Delete profile</button>
                        <h4>Meals</h4>
                        <ul>
                            {meals && ( meals.map((meal) => (
                        <div  key={meal.id}>
                        <h5 className="card-title">{meal.name}</h5>
                      <p className="card-text">{meal.description}</p>
                      <p className="card-text">Calories: {meal.calories}</p>
                      <p className="card-text">Carbohydrates: {meal.carbohydrates}</p>
                      <p className="card-text">Proteins: {meal.proteins}</p>
                      <p className="card-text">Fats: {meal.fats}</p>
                      <p className="card-text">Fiber: {meal.fiber}</p>
                        </div>
                        
                          )))}
                        
                       </ul>
                       
                       </div>
                       </div>
                    )}
                  
                   
                   
              
                  
            
            
       {parseInt(window.sessionStorage.getItem("admin"))!==0 && (
       <div className="calendar-section">
        <h3>Meal Calendar</h3>
        <Calendar onChange={handleDateChange} value={selectedDate} />
        <div className="meal-inputs">
          <h4>Breakfast</h4>
          <input type="text" name="meal" value={mealData.breakfast.meal} onChange={(e) => handleMealDataChange(e, 'breakfast')} placeholder="Meal" />
          <input type="text" name="weight" value={mealData.breakfast.weight} onChange={(e) => handleMealDataChange(e, 'breakfast')} placeholder="Weight" />
          <input type="text" name="calories" value={mealData.breakfast.calories} onChange={(e) => handleMealDataChange(e, 'breakfast')} placeholder="Calories" />
         
          <h4>Snack 1</h4>
          <input type="text" name="meal" value={mealData.snack1.meal} onChange={(e) => handleMealDataChange(e, 'snack1')} placeholder="Meal" />
          <input type="text" name="weight" value={mealData.snack1.weight} onChange={(e) => handleMealDataChange(e, 'snack1')} placeholder="Weight" />
          <input type="text" name="calories" value={mealData.snack1.calories} onChange={(e) => handleMealDataChange(e, 'snack1')} placeholder="Calories" />


          <h4>Lunch</h4>
          <input type="text" name="meal" value={mealData.lunch.meal} onChange={(e) => handleMealDataChange(e, 'lunch')} placeholder="Meal" />
          <input type="text" name="weight" value={mealData.lunch.weight} onChange={(e) => handleMealDataChange(e, 'lunch')} placeholder="Weight" />
          <input type="text" name="calories" value={mealData.lunch.calories} onChange={(e) => handleMealDataChange(e, 'lunch')} placeholder="Calories" />


          <h4>Snack 2</h4>
          <input type="text" name="meal" value={mealData.snack2.meal} onChange={(e) => handleMealDataChange(e, 'snack2')} placeholder="Meal" />
          <input type="text" name="weight" value={mealData.snack2.weight} onChange={(e) => handleMealDataChange(e, 'snack2')} placeholder="Weight" />
          <input type="text" name="calories" value={mealData.snack2.calories} onChange={(e) => handleMealDataChange(e, 'snack2')} placeholder="Calories" />


          <h4>Dinner</h4>
          <input type="text" name="meal" value={mealData.dinner.meal} onChange={(e) => handleMealDataChange(e, 'dinner')} placeholder="Meal" />
          <input type="text" name="weight" value={mealData.dinner.weight} onChange={(e) => handleMealDataChange(e, 'dinner')} placeholder="Weight" />
          <input type="text" name="calories" value={mealData.dinner.calories} onChange={(e) => handleMealDataChange(e, 'dinner')} placeholder="Calories" />

          <button onClick={handleSaveMeals}>Save Meals</button>
        </div>
       
      </div>)}             
      
      </div>
</div>
  );
}

export default ProfilePage;
