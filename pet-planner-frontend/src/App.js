import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CreateEvent from './components/CreateEventModal';
import CreatePet from './components/CreatePetModal';
import HomePage from './components/HomePage';
import LoginModal from './components/Login';
import Navbar from './components/Navbar';
import PetEvents from './components/PetsDetail';
import PetsPage from './components/PetsPage';
import SignupModal from './components/SignUp';
import UserPage from './components/UserPage';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEvents } from './store/events';
import { getPets } from './store/pets';
import { restoreUser } from './store/session';


function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch()

  useEffect(() => {

    if (!user) {
      const userToken = localStorage.getItem('userToken');

      if (userToken) {

        dispatch(restoreUser(userToken));
        if (user) {
          dispatch(getPets(user.id))
          dispatch(getEvents(user.id))
        }

      } else {
        return;
      }
    } else {
      dispatch(getPets(user.id))
      dispatch(getEvents(user.id))
    };


  }, [dispatch]);

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
        <Route path="/" element={<HomePage user={user} onShowSignup={handleShowSignup} onShowLogin={handleShowLogin} />} />
        <Route path="/UserPage" element={<UserPage />} />
        <Route path="/pets" element={<PetsPage />} />
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
