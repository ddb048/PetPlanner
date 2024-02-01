import React, { useState } from 'react';
import { signup} from '../../auth';
import './index.css';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/session.js';
import { useNavigate } from 'react-router-dom';

function SignupModal({ onClose }) {
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
    const dispatch=useDispatch();
    const navigate = useNavigate();

    const handleSignup = async (event) => {
       
        event.preventDefault();
        setError('');
        setSuccess(false);

        const userData = {
            username: username,
             password: password,
            email: email, 
            role: "ROLE_ADMIN",
             profilePic: profilePic, 
        };
       
        const response =await dispatch(signup(userData));

        if (response.success) {
            //FIXME - insert redirect to userDetails page
            dispatch(setUser(response.data.user)).then(() => {
                navigate('/UserPage');
                onClose();
            });

            onClose();
        } else {
            setError(response.message || 'Signup failed');
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
