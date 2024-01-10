import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PetPlannerLogo from '../../assets/PetPlannerLogo.png';
import arrow from '../../assets/arrow.svg';
import caret from '../../assets/caret.svg';
import userProfilePic from '../../assets/profile.png';
import './index.css';

import { isLoggedIn, logout } from '../../auth';

function Navbar({ onShowSignup, onShowLogin }) {



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
                    <LoggedOutMenu onShowSignup={onShowSignup} onShowLogin={onShowLogin} />
                )}
            </div>
        </nav>
    );
}

function LoggedOutMenu({ onShowSignup, onShowLogin }) {
    return (
        <div className='nav-button'>
            <Link className="nav-text" onClick={onShowLogin}>Login</Link>
            <Link className="nav-text" onClick={onShowSignup}>Sign Up</Link>
        </div>
    );
}

function LoggedInMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        console.log("Toggling Dropdown. Current state:", isOpen);
        setIsOpen(!isOpen);
    };


    useEffect(() => {
        const closeDropdown = (event) => {
            console.log("Clicked element:", event.target);
            if (isOpen && (!event.target.matches('.navbar-profile-pic'))) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", closeDropdown);
        return () => document.removeEventListener("click", closeDropdown);
    }, []);

    return (
        <div className='dropdown'>
            <div className='nav-profile_dropdown_container'>
                <img
                    src={userProfilePic}
                    className="navbar-profile-pic"
                />
                <div className="icon" onClick={toggleDropdown}>
                    {isOpen ? <img src={arrow} /> : <img src={caret} />}
                </div>
            </div>
            <div className="dropdown-menu" style={{ display: isOpen ? 'block' : 'none' }}>
                <Link className="dropdown-item" to="/pets">User's Pets</Link>
                <Link className="dropdown-item" to="/pet-events/:id">Host an Event</Link>
                <Link className="dropdown-item" to="/pets/new">Add a Pet</Link>
                <div className="dropdown-item" onClick={logout}>Sign Out</div>
            </div>
        </div>
    );
}


export default Navbar;
