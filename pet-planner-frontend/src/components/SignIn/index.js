import React from 'react';

function SignupModal({ onClose }) {
    // Add states for each signup field

    const handleSignup = (event) => {
        event.preventDefault();
        // Implement signup logic here
    };

    return (
        <div className="modal">
            <form onSubmit={handleSignup}>
                {/* Input fields for signup */}
                <button type="submit">Sign Up</button>
                <button onClick={onClose}>Close</button>
            </form>
        </div>
    );
}

export default SignupModal;
