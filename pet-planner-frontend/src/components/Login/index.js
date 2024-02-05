import React, { useState } from 'react';
import { useDispatch as UseDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/session';

import './index.css';


function LoginModal({ onClose }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const errors = useSelector(state => state.session.errors); // Access the errors state from the Redux store
    const error = useSelector(state => state.session.error); // Access the error state from the Redux store

    const dispatch = UseDispatch();
    const navigate = useNavigate();


    const handleBackdropClick = (event) => {
        if (event.target.classList.contains('modal-backdrop')) {
            onClose();
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        const user = { username, password };
        console.log( 'user from login', user );
        await dispatch(login(user));


        if (!error) {
            onClose();
            navigate('/UserPage');
        } else {
            alert(error);
        }
    };

    const demoUserLogin = async (event) => {
        event.preventDefault();

        const user = { username: 'alexg', password: 'pass456' };
        await dispatch(login(user));

        if (!error) {
            onClose();
            navigate('/UserPage');
        } else {
            alert(error);
        }
    }

    return (
        <div className='modal-backdrop' onClick={handleBackdropClick}>
            <div className="modal">
                <div className="modal-content">

                    {errors && errors.map((error, index) => (
                        <div key={index} className='error-message'>{error}</div>
                    ))}
                    <div className="modal-title"> Login </div>
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
                            <button className="modal-button" type="submit">Login </button>
                            <button className="modal-button" type="button" onClick={onClose}>Close</button>
                            <button className='modal-button' type="button" onClick={demoUserLogin}>Demo User</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;
