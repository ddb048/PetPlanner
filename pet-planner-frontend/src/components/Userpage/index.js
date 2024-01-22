import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEvents } from '../../store/events';
import { getPets } from '../../store/pets';
import EventCards from '../EventCards';

// import DisplayPets from '../PetsList';


const UserPage = () => {

  //State-related
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPets())
    dispatch(getEvents())
  }, [dispatch]);

  //Pet-Data related (if petsObj is already an array, remove pets)
  const petsObj = useSelector(state => state.pets.pets || []);
  const pets = Object.values(petsObj);

  //Event-Data and date filtering for display (if eventsObj is already an array, remove events)
  const eventsObj = useSelector(state => state.events.events || []);
  const events = Object.values(eventsObj);
  const futureEvents = events.filter(event => event.date >= new Date().toISOString());
  const pastEvents = events.filter(event => event.date < new Date().toISOString());

  //Date-related variables we need to initialize
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


  return (
    <div>
      <h1>User Information:</h1>
      {userData ? (
        <div>

          <div class>
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>
          </div>

          <div>
            Placeholder: Display Pets
          </div>

          <div className='userpage__events-text'>
            Upcoming Events:
          </div>
          <div classname='userpage__future-events'>
            {futureEventDisplay}
          </div>

          <div className='userpage__events-text'>
            Past Events:
          </div>
          <div className='userpage__past-events'>
            {pastEventDisplay}
          </div>
        </div>

      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserPage;
