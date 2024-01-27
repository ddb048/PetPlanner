import React from 'react';
import petPlannerImage from '../../assets/PetPlannerLogo.png';
import './index.css';

function HomePage({ onShowSignup, onShowLogin, user }) {


    return (
        <div className="home-page">
            <div className='homepage-img'>
                <img src={petPlannerImage} alt="PetPlanner" className="pet-planner-image" />
            </div>
            <div className="auth-links">
                {!user &&
                    <button onClick={onShowSignup}>Sign Up</button>}

                {!user &&
                    <button onClick={onShowLogin}>Login</button>}






            </div>

        </div>
    );
}

export default HomePage;
