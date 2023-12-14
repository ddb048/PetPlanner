import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginModal from './components/Login';
import Navbar from './components/Navbar';
import SignupModal from './components/SignIn';

import PetEvents from './components/PetsDetail';
import CreatePet from './components/PetsDetail/CreatePet';
import DisplayPets from './components/PetsDetail/DisplayPets';

function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);


  const handleShowSignup = () => setShowSignup(true);
  const handleShowLogin = () => setShowLogin(true);
  const handleCloseModal = () => {
    setShowSignup(false);
    setShowLogin(false);
  };
  return (


    <Router>
      <Navbar onShowSignup={handleShowSignup} onShowLogin={handleShowLogin} />
      <Routes>
        <Route path="/" element={<HomePage onShowSignup={handleShowSignup} onShowLogin={handleShowLogin} />} />

        <Route path="/pets" element={<DisplayPets />} />
        <Route path="/create-pet" element={<CreatePet />} />
        <Route path="/pet-events/:id" element={<PetEvents />} />
        <Route path="/signup" element={<SignupModal />} />
      </Routes>
      {showSignup && <SignupModal onClose={handleCloseModal} />}
      {showLogin && <LoginModal onClose={handleCloseModal} />}
    </Router>
  );
}

export default App;
