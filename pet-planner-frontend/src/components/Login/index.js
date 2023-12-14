import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './index.css';


function LoginModal({ onClose }) {
    
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleBackdropClick = (event) => {
        if (event.target.classList.contains('modal-backdrop')) {
            onClose();
        }
    };


    const handleLogin = (event) => {
        event.preventDefault();
        navigate('/pets');
        // Implement login logic here
    };

    return (
        <div className='modal-backdrop' onClick={handleBackdropClick}>
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-title">Login</div>
                    <form onSubmit={handleLogin}>
                        <input
                            className="modal-input"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                        <input
                            className="modal-input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <div className='modal-button-container'>
                            <button className="modal-button" type="submit">Login</button>
                            <button className="modal-button" type="button" onClick={onClose}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;
