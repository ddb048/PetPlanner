import React, { useState } from 'react';
import { signup } from '../../auth';
import './index.css';

function SignupModal({ onClose }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);


    const handleBackdropClick = (event) => {
        if (event.target.classList.contains('modal-backdrop')) {
            onClose();
        }
    };

    const handleSignup = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess(false);

        const response = await signup(username, password, email, profilePic);
        if (response.success) {
            setSuccess(true);
            //FIXME - insert redirect to userDetails page
            onClose();
        } else {
            setError(response.message || 'Signup failed');
        }
    };

    const handleProfilePicChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setProfilePic(event.target.files[0]);
        }
    };

    return (
        <div className='modal-backdrop' onClick={handleBackdropClick}>
            <div className="modal">
                <div className='modal-content'>
                    <div className='modal-title'>Sign Up</div>
                    {error && <div className="error">{error}</div>}
                    {success && <div className="success">Signup successful!</div>}
                    <form onSubmit={handleSignup}>
                        <input
                            className="modal-input"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            className="modal-input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            className="modal-input"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input
                            className="modal-input"
                            type="file"
                            placeholder="Upload a profile Picture"
                            onChange={handleProfilePicChange} />
                        <div className='modal-button-container'>
                            <button className="modal-button" type="submit">Sign Up</button>
                            <button className="modal-button" type="button" onClick={onClose}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignupModal;
