import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginModal from './components/Login';
import Navbar from './components/Navbar';
import SignupModal from './components/SignIn';


import DisplayPets from './components/PetsDetail/DisplayPets'; 
import CreatePet from './components/PetsDetail/CreatePet'; 
import PetEvents from './components/PetsDetail/PetEvents'; 

function App() {
<<<<<<< HEAD
=======
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
>>>>>>> a360362e16dd158b2eb228aa4ca8c6ce35b8ced1

  return (


    <Router>
      <Navbar onShowSignup={() => setShowSignup(true)} onShowLogin={() => setShowLogin(true)} />
      <Routes>
        <Route path="/" element={<HomePage />} />
<<<<<<< HEAD

        <Route path="/pets" element={<DisplayPets />} />
        <Route path="/create-pet" element={<CreatePet />} />
        <Route path="/pet-events/:id" element={<PetEvents />} />
        <Route path="/signup" element={<SignupModal />} />
=======
        {/* ...other routes */}
>>>>>>> a360362e16dd158b2eb228aa4ca8c6ce35b8ced1
      </Routes>
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </Router>
  );
}

export default App;
