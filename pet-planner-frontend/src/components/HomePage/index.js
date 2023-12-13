import React, { useState } from 'react';
import petPlannerImage from '../../assets/PetPlannerLogo.png';
import LoginModal from '../Login';
import SignupModal from '../SignIn';
import './index.css';

function HomePage() {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);


    return (
        <div className="home-page">
            <img src={petPlannerImage} alt="PetPlanner" className="pet-planner-image" />
            <div className="auth-links">
                <button onClick={() => setShowSignup(true)}>Sign Up</button>
                <button onClick={() => setShowLogin(true)}>Login</button>

              

            </div>
            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
            {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}

        </div>
    );
}

export default HomePage;
