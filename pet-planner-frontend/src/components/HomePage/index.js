import React from 'react';
import petPlannerImage from '../../assets/PetPlannerLogo.png';
import './index.css';

function HomePage() {
    return (
        <div className="home-page">
            <img src={petPlannerImage} alt="PetPlanner" className="pet-planner-image" />
            <div className="auth-links">
                <button onClick={() => window.location.href = '/signup'}>Sign Up</button>
                <button onClick={() => window.location.href = '/login'}>Login</button>
            </div>
        </div>
    );
}

export default HomePage;
