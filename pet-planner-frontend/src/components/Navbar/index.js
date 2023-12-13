import React from 'react';
import { Link } from 'react-router-dom';
import PetPlannerLogo from '../../assets/PetPlannerLogo.png';
import './index.css';

import { isLoggedIn, logout } from '../../auth';

function Navbar() {
    return (
        <nav className="nav-bar">
            <div className='nav-bar-left'>
                <Link to="/" >

                    <img className="navbar-logo" src={PetPlannerLogo} alt="PetPlanner Logo" />
                </Link>
            </div>
            <div className="nav-bar-right">
                {isLoggedIn() ? (
                    <LoggedInMenu />
                ) : (
                    <LoggedOutMenu />
                )}
            </div>
        </nav>
    );
}

function LoggedInMenu() {
    return (
        <div className='nav-button'>
            <Link className="nav-text" to="/user-details">User Details</Link>
            <Link className="nav-text" to="/create-event">Host an Event</Link>
            <Link className="nav-text" to="/create-pet">Add a Pet</Link>
            <Link className="nav-text" onClick={logout}>Sign Out</Link>
        </div>
    );
}

function LoggedOutMenu() {
    return (
        <div className='nav-button'>
            <Link className="nav-text" to="/login">Login</Link>
            <Link className="nav-text" to="/signup">Sign Up</Link>
        </div>
    );
}

export default Navbar;