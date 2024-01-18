import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CreateEvent from './components/CreateEventModal';
import CreatePet from './components/CreatePetModal';
import HomePage from './components/HomePage';
import LoginModal from './components/Login';
import Navbar from './components/Navbar';
import PetEvents from './components/PetsDetail';
import DisplayPets from './components/PetsList';
import SignupModal from './components/SignIn';

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
        <Route path="/pets/new" element={<CreatePet />} />
        <Route path="events/new" element={<CreateEvent onClose={handleCloseModal} />} />
        <Route path="/events/:EventId" element={<PetEvents />} />
        <Route path="/signup" element={<SignupModal />} />
      </Routes>
      {showSignup && <SignupModal onClose={handleCloseModal} />}
      {showLogin && <LoginModal onClose={handleCloseModal} />}
    </Router>
  );
}

export default App;
