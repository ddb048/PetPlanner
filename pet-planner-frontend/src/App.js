import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import SignupModal from './components/SignIn';
import PetDetails from './PetDetails';
import PetEvents from './PetEvents';
import DisplayPets from './DisplayPets';
function App() {
  return (

    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/pets" element={<DisplayPet />} />
        <Route path="/pet-detail/:id" element={<PetDetails />} />
        <Route path="/pet-events/:id" element={<PetEvents />} />
        <Route path="/signup" element={<SignupModal />} />
      </Routes>
    </Router>
  );
}

export default App;
