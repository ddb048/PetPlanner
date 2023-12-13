import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import PetsDetail from './components/PetsDetail';
import DisplayPets from './DisplayPets';
import PetDetails from './PetDetails';

function App() {
  return (

    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pets" element={<DisplayPets />} />
        <Route path="/pet/:id" element={<PetDetails />} />
        
      </Routes>
    </Router>
  );
}

export default App;
