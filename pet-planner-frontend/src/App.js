import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginModal from './components/Login';
import Navbar from './components/Navbar';
import SignupModal from './components/SignIn';

function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Router>
      <Navbar onShowSignup={() => setShowSignup(true)} onShowLogin={() => setShowLogin(true)} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* ...other routes */}
      </Routes>
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </Router>
  );
}

export default App;
