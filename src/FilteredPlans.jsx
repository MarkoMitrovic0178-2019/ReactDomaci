import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './FilteredPlansPage.css';


function FilteredPlansPage() {
  const location = useLocation();
  const { state } = location;
  const filteredPlan = state ? state.filteredPlans : null;

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  if (!filteredPlan) {
    return <div>No filtered plans found</div>;
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Filtered Diet Plan</h2>
      <div className="card">
        <h3>{filteredPlan.type}</h3>
        <p>{filteredPlan.description}</p>
        <button onClick={toggleDetails}>
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
        {showDetails && (
          <div>
            <h4>Meals</h4>
            <ul>
              {filteredPlan.meals.map((meal, index) => (
                <li key={index}>{meal}</li>
              ))}
            </ul>
            <h4>Nutrition</h4>
            <p>Calories: {filteredPlan.nutrition.calories}</p>
            <p>Carbohydrates: {filteredPlan.nutrition.carbohydrates}</p>
            <p>Proteins: {filteredPlan.nutrition.proteins}</p>
            <p>Fats: {filteredPlan.nutrition.fats}</p>
            <p>Fiber: {filteredPlan.nutrition.fiber}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilteredPlansPage;