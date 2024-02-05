import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../store/session';
import './index.css';


function SignupModal({ onClose }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [role, setRole] = useState('');
    const [profilePic, setProfilePic] = useState('');


    const handleBackdropClick = (event) => {
        if (event.target.classList.contains('modal-backdrop')) {
            onClose();
        }
    };


    const handleSignup = async (event) => {

        event.preventDefault();
        setError('');
        setSuccess(false);

        const newUser = {
            username,
            password,
            email,
            profilePic: "https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg",
            role: "ROLE_USER",
            enabled: true
        }

        console.log( 'newUser from handleSignup step1', newUser);

        const response = await dispatch(signup(newUser));

        if (response) {

            if (!error) {
                setSuccess(true);
            } else {
                alert(error);
            }
        } else {
            console.log('response from handleSignup', response);
    };
};

    return (
        <div className='modal-backdrop' onClick={handleBackdropClick}>
            <div className="modal">
                <div className='modal-content'>
                    <div className='modal-title'>Sign Up</div>
                    {error && <div className="error">{error}</div>}
                    {success && <div className="success">Signup successful! Please log in</div>}
                    <form>
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
                        <div className='modal-button-container'>
                            <button className="modal-button" type="submit" onClick={handleSignup}>Sign Up</button>
                            <button className="modal-button" type="button" onClick={onClose}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignupModal;
