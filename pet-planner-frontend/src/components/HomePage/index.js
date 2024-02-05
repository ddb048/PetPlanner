import React from 'react';
import { Link } from 'react-router-dom';
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

                {user &&
                    <Link  to='/events' className='auth-links__button'>
                    
                    <button>Events</button>
                    
                    
                     </Link>}
                {user &&
                    <Link to='/pets' className='auth-links__button'>    <button>Pets</button> </Link>}
                {user &&
                    <Link to='/UserPage' className='auth-links__button'> <button>Home Page</button> 
                    
                    </Link>}





            </div>

        </div>
    );
}

export default HomePage;
