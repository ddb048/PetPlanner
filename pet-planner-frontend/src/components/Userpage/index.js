import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import EventCards from '../EventCards';
import PetCards from '../PetCards';
import './index.css';

const UserPage = () => {

  //State-related
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const user = useSelector(state => state.session.user);
  const [loading, setLoading] = useState(true);


  // if (!user) {
  //   navigate('/');
  // }

  // useEffect(() => {

  //   if (!user) {
  //     const userToken = localStorage.getItem('userToken');

  //     if (userToken) {

  //       dispatch(restoreUser(userToken));
  //       if (user) {
  //         dispatch(getPets(user.id))
  //         dispatch(getEvents(user.id))
  //       }

  //     } else {
  //       navigate('/');
  //     }
  //   } else {
  //     dispatch(getPets(user.id))
  //     dispatch(getEvents(user.id))
  //   };


  // }, [dispatch]);

  // Event-Data and date filtering for display
  const eventsObj = useSelector(state => state.events.events || []);
  const events = Object.values(eventsObj);
  const futureEvents = events.filter(event => event.date >= new Date().toISOString());
  const pastEvents = events.filter(event => event.date < new Date().toISOString());

  //Date-related variables we need to initialize for events (Events logic)
  let futureEventDisplay;
  let pastEventDisplay;

  if (futureEvents.length > 0) {
    futureEventDisplay = (
      futureEvents.map(event => (
        <EventCards key={event.id} event={event} />
      ))
    )
  } else {
    futureEventDisplay = (
      <>
        <div className='no-events__container'>
          <div className='no-events__text'> There are current no upcoming events for you. </div>
        </div>
      </>
    )
  };

  if (pastEvents.length > 0) {
    pastEventDisplay = (
      pastEvents.map(event => (
        <EventCards key={event.id} event={event} />
      ))
    )
  } else {
    pastEventDisplay = (
      <>
        <div className='no-events__container'>
          <div className='no-events__text'> There are no attended events in your history. </div>
        </div>
      </>
    )
  }


  // Pet Card Related
  const petsObj = useSelector(state => state.pets.pets || []);
  const pets = Object.values(petsObj);

  // Pets Display Logic
  let petDisplay;
  if (pets.length > 0) {
    petDisplay = pets.map(pet => (
      <PetCards key={pet.id} pet={pet} />
    ));
  } else {
    petDisplay = (
      <div className='no-pets__container'>
        <div className='no-pets__text'>
          No pets found.
        </div>
      </div>
    );
  }

  return (
    <div className='userpage-content__container'>

      {user ? (
        <div className='userpage__content'>
          {/* {user.profilePic && (
            <div className='userpage__profile-pic'>
              <img className='userpage__profile-pic-img' alt='User Profile Pic' src={user.profilePic} />
            </div>
          )} */}

          {user.username && (
            <div className='userpage__username'>
              Username: {user.username}
            </div>
          )}

          {user.email && (
            <div className='userpage__email'>
              Email: {user.email}
            </div>
          )}

          <div className='userpage__pets-header'>
            Your Pets:
          </div>
          <Link className='userpage__add-pet-link' to='/pets/new'>Add a Pet</Link>
          {pets.length > 0 && (
            <div className='userpage__pets'>
              {petDisplay}
            </div>
          )}

          <div className='userpage__events-section'>
            <div className='userpage__future-events'>
              Upcoming Events:
              {futureEventDisplay}
            </div>

            <div className='userpage__past-events'>
              Past Events:
              {pastEventDisplay}
            </div>
          </div>


        </div>
      ) : (
        <div className='userpage__loading'>
          Loading user data...
        </div>
      )}
    </div>
  );
};

export default UserPage;
