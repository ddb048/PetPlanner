import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CreateEvent from './components/CreateEventModal';
import CreatePet from './components/CreatePetModal';
import UpdateEvent from './components/UpdateEventModal';
import UpdatePet from './components/UpdatePetModal';
import UpdateUser from './components/UpdateUserModal';

import EventCardSingle from './components/EventCardSingle';
import EventsPage from './components/EventsPage';

import HomePage from './components/HomePage';
import LoginModal from './components/Login';
import Navbar from './components/Navbar';
import PetCardSingle from './components/PetCardSingle';
import PetsPage from './components/PetsPage';
import SignupModal from './components/SignUp';
import UserPage from './components/UserPage';

import { getEvents, getUserEvents } from './store/events';
import { getPets } from './store/pets';
import { restoreUser } from './store/session';


function App() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user);
  const pets = useSelector(state => state.pets.pets);
  const events = useSelector(state => state.events.events);
  const userEvents = useSelector(state => state.events.userEvents);

  const [petsLoading, setPetsLoading] = useState(false);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);


  // useEffect for restoring the user on refresh
  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken && !user) {
      dispatch(restoreUser(userToken));
    }
  }, [user, dispatch]);

  // useEffect for fetching pets
  useEffect(() => {
    if (user && user.id) {
      setPetsLoading(true);
      dispatch(getPets(user.id))
        .then(() => setPetsLoading(false))
        .catch(() => setPetsLoading(false));
    }
  }, [user, dispatch]);

  // useEffect for fetching events
  useEffect(() => {
    if (user && user.id) {
      setEventsLoading(true);
      dispatch(getUserEvents(user.id))
        .then(() =>  {
          setEventsLoading(false);
          // console.log("users event dispatched")
        }
        )
        .catch(() => setEventsLoading(false));
    }
  }, [user, dispatch]);

  // useEffect for fetching events
  useEffect(() => {
    if (user && user.id) {
      setEventsLoading(true);
      dispatch(getEvents(user.id))
        .then(() => setEventsLoading(false))
        .catch(() => setEventsLoading(false));
    }
  }, [user, dispatch]);


  const handleShowSignup = () => setShowSignup(true);
  const handleShowLogin = () => setShowLogin(true);
  const handleCloseModal = () => {
    setShowSignup(false);
    setShowLogin(false);
  };

  if (petsLoading && eventsLoading) {
    return <div> Loading... </div>;
  }

      return (


        <Router>
          <Navbar onShowSignup={handleShowSignup} onShowLogin={handleShowLogin} />
          <Routes>
            <Route path="/" element={<HomePage user={user} onShowSignup={handleShowSignup} onShowLogin={handleShowLogin} />} />
            <Route path="/UserPage" element={<UserPage user={user} pets={pets} events={userEvents} />} />
            <Route path="/users/:userId/update" element={<UpdateUser />} />

            <Route path="/pets" element={<PetsPage pets={pets} />} />
            <Route path="/pets/:petId" element={<PetCardSingle />} />
            <Route path="/pets/:petId/update" element={<UpdatePet />} />
            <Route path="/pets/new" element={<CreatePet />} />

            <Route path="/events" element={<EventsPage events={events} />} />
            <Route path="/events/:eventId" element={<EventCardSingle />} />
            <Route path="/events/:eventId/update" element={<UpdateEvent />} />
            <Route path="/events/new" element={<CreateEvent onClose={handleCloseModal} />} />
            <Route path="/signup" element={<SignupModal />} />
          </Routes>
          {showSignup && <SignupModal onClose={handleCloseModal} />}
          {showLogin && <LoginModal onClose={handleCloseModal} />}
        </Router>
      );
  }






export default App;
