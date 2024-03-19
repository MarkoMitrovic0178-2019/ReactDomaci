import React, { useState , useEffect} from 'react';
import './ProfilePage.css';
import { Calendar } from 'react-calendar';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser')); 
  const [filteredPlan, setFilteredPlan] = useState(null);
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
    const savedMeals = JSON.parse(localStorage.getItem(`mealData_${currentUser.id}_${date.toDateString()}`));
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

  // Function to handle meal data change
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
    if (currentUser) {
      localStorage.setItem(`mealData_${currentUser.id}_${selectedDate.toDateString()}`, JSON.stringify(mealData));
      alert('Meal data saved successfully!');
    } else {
      alert('You must be logged in to save meal data.');
      navigate('/login'); 
    }
  };
  
  useEffect(() => {
    
    const savedPlan = JSON.parse(localStorage.getItem(`filteredPlan_${currentUser.id}`));
    console.log(savedPlan);
    if (JSON.stringify(savedPlan) !== JSON.stringify(filteredPlan)) {
      if (savedPlan==null){
        setFilteredPlan(null);
      }
      else{
        setFilteredPlan(savedPlan);
      }
    }

   
  }, [currentUser,filteredPlan]); 
  

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/log-in');
  };
  return (
    <div className="profile-container">
       
      <div className="filtered-plan-section">
        <h3 >Filtered Plan</h3>
        
        {filteredPlan? (
        <>
        <h3>{filteredPlan.type}</h3>
        <p>{filteredPlan.description}</p>
        <p>Calories: {filteredPlan.nutrition.calories}</p>
        <p>Carbohydrates: {filteredPlan.nutrition.carbohydrates}</p>
        <p>Proteins: {filteredPlan.nutrition.proteins}</p>
        <p>Fats: {filteredPlan.nutrition.fats}</p>
        <p>Fiber: {filteredPlan.nutrition.fiber}</p>
       </>
        ) : (
       <p>No personalised plan added</p>
       )}
        
      </div>
      <div className="calendar-section">
        <div className="logout-container">
        <button onClick={handleLogout}>Logout</button>
        </div>
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
        
      </div>
    
    </div>
  );
}

export default ProfilePage;
