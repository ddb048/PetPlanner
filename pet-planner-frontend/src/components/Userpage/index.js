import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEvents } from '../../store/events';
import { getPets } from '../../store/pets';
import EventCards from '../EventCards';
import PetCards from '../PetCards';


const UserPage = () => {

  //State-related
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getPets(user.id))
    dispatch(getEvents(user.id))
  }, [dispatch]);

  // Event-Data and date filtering for display Related
  // Note: (if eventsObj is already an array, remove events and adjust this)
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
  // Note: (if petsObj is already an array, remove pets and adjust this)
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
