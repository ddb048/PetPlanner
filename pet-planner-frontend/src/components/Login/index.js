import React, { useState } from 'react';
import { authenticate } from '../../auth';
import './index.css';

function LoginModal({ onClose }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleBackdropClick = (event) => {
        if (event.target.classList.contains('modal-backdrop')) {
            onClose();
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setError(''); // Reset any previous errors

        const result = await authenticate(username, password);
        if (result.success) {
            // Close modal and possibly redirect or update UI
            onClose();
            // Implement any post-login logic, such as redirecting or updating UI
        } else {
            setError(result.message); // Show error message to the user
        }
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
                        {error && <div className="error-message">{error}</div>}
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
