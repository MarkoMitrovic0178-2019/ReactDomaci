// HomePage.js

import React from 'react';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="container">
            <h1>Welcome to DietPlanner</h1>
            <p>Dieting is important for maintaining a healthy lifestyle and achieving your fitness goals. A balanced diet can provide your body with the nutrients it needs to function optimally and support overall well-being.</p>
            <p>Start your journey towards a healthier you by creating your personalized diet plan today!</p>
            <a href="/user-form" className="cta-button">Get Your Personalized Diet Plan Now!</a>
        </div>
    );
}

export default HomePage;
