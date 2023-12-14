import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import SignupModal from './components/SignIn';


import DisplayPets from './components/PetsDetail/DisplayPets'; 
import CreatePet from './components/PetsDetail/CreatePet'; 
import PetEvents from './components/PetsDetail/PetEvents'; 

function App() {

  return (


    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/pets" element={<DisplayPets />} />
        <Route path="/create-pet" element={<CreatePet />} />
        <Route path="/pet-events/:id" element={<PetEvents />} />
        <Route path="/signup" element={<SignupModal />} />
      </Routes>
    </Router>
  );
}

export default App;
