import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../store/session';

import './index.css';


function LoginModal({ onClose }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const errors = useSelector(state => state.session.errors);

    const dispatch = UseDispatch();
    const history = useHistory();


    const handleBackdropClick = (event) => {
        if (event.target.classList.contains('modal-backdrop')) {
            onClose();
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        const user = { username, password };
        const error = await dispatch(login(user));
        if (!error) {
            onClose();
            history.push('/UsersPage');
        } else {
            const errorMessage = error.map((error) => error + ' ');
            alert(errorMessage);
        }

    };

    return (
        <div className='modal-backdrop' onClick={handleBackdropClick}>
            <div className="modal">
                <div className="modal-content">

                    {errors && errors.map((error, index) => (
                        <div key={index} className='error-message'>{error}</div>
                    ))}
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
