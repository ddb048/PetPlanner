import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CreateEvent from './components/CreateEventModal';
import CreatePet from './components/CreatePetModal';
import UpdatePet from './components/UpdatePetModal';
import HomePage from './components/HomePage';
import LoginModal from './components/Login';
import Navbar from './components/Navbar';
import PetEvents from './components/PetsDetail';
import PetsPage from './components/PetsPage';
import SignupModal from './components/SignUp';
import UserPage from './components/Userpage';

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
        <Route path="/UserPage" element={<UserPage />} />
        <Route path="/pets" element={<PetsPage />} />
        <Route path="/pets/new" element={<CreatePet />} />
        <Route path="/pets/:petId/update" element={<UpdatePet />} />
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
