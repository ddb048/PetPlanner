import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CreateEvent from './components/CreateEventModal';
import CreatePet from './components/CreatePetModal';
import EventCardSingle from './components/EventCardSingle';
import EventsPage from './components/EventsPage';
import HomePage from './components/HomePage';
import LoginModal from './components/Login';
import Navbar from './components/Navbar';
import PetCardSingle from './components/PetCardSingle';
import PetsPage from './components/PetsPage';
import SignupModal from './components/SignUp';
import UserPage from './components/UserPage';

import { getEvents } from './store/events';
import { getPets } from './store/pets';
import { restoreUser } from './store/session';


function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user);


  // useEffect for restoring the user
  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken && !user) {
      dispatch(restoreUser(userToken));
    }
  }, [user, dispatch]);

  // useEffect for fetching data after user is restored
  useEffect(() => {
    if (user) {
      dispatch(getPets(user.userId));
      dispatch(getEvents(user.userId));
    }
  }, [user, dispatch]);


  const pets = useSelector(state => state.pets.pets);
  const events = useSelector(state => state.events.events);

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
        <Route path="/pets" element={<PetsPage pets={pets} />} />
        <Route path="/pets/:petId" element={<PetCardSingle />} />
        <Route path="/pets/new" element={<CreatePet />} />
        <Route path="/events" element={<EventsPage events={events}/>} />
        <Route path="/events/:eventId" element={<EventCardSingle />} />
        <Route path="events/new" element={<CreateEvent onClose={handleCloseModal} />} />
        <Route path="/signup" element={<SignupModal />} />
      </Routes>
      {showSignup && <SignupModal onClose={handleCloseModal} />}
      {showLogin && <LoginModal onClose={handleCloseModal} />}
    </Router>
  );
}

export default App;
