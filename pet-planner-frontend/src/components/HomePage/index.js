import React from 'react';
import petPlannerImage from '../../assets/PetPlannerLogo.png';
import './index.css';
import { Link } from 'react-router-dom';

function HomePage({ onShowSignup, onShowLogin }) {


    return (
        <div className="home-page">
            <div className='homepage-img'>
                <img src={petPlannerImage} alt="PetPlanner" className="pet-planner-image" />
            </div>
            <div className="auth-links">
                <button onClick={onShowSignup}>Sign Up</button>
                <button onClick={onShowLogin}>Login</button>


                
            


            </div>

        </div>
    );
}

export default HomePage;
