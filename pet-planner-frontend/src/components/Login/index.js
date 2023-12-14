import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginModal({ onClose }) {
    
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        navigate('/pets');
        // Implement login logic here
    };

    return (
        <div className="modal">
            <form onSubmit={handleLogin}>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit">Login</button>
                <button onClick={onClose}>Close</button>
            </form>
        </div>
    );
}

export default LoginModal;
