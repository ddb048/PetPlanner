import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import EventsList from '../EventsList';
import { getPets } from '../../store/pets'; 
import { getEvents } from '../../store/events';

// import DisplayPets from '../PetsList';


const UserPage = () => {
  
  //State-related
  const [  userData, setUserData  ] = useState(null);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPets())
    dispatch(getEvents())
  }, [dispatch]);

    //Pet-Data related (if petsObj is already an array, remove pets)
    const petsObj = useSelector(state => state.pets.pets || []);
    const pets = Object.values(petsObj);
    
    //Event-Data and date filtering for display (if eventsObj is already an array, remove events)
    const eventsObj= useSelector(state => state.events.events || []);
    const events = Object.values(eventsObj);
    const futureEvents = events.filter(event => event.date >= new Date().toISOString());
    const pastEvents = events.filter(event => event.date < new Date().toISOString());

    //To-do

    // 1 --- Create an EventDetails component that accepts a single Event (we will map to this)

      // We will use this as a placeholder for the UTC time: 
      // May want to consider other options

      //   function splitDateTime(dateTimeString) {
      //     const [date, fullTime] = dateTimeString.split('T');
      //     const time = fullTime.split('.')[0]
      //     return { date, time };
      // }

      // function convertToAMPM(timeString) {
      //     const [hour, minute] = timeString.split(':');
      //     let amOrPm = 'AM';
      //     let adjustedHour = parseInt(hour, 10);
      
      //     if (adjustedHour >= 12) {
      //         amOrPm = 'PM';
      //         if (adjustedHour > 12) {
      //             adjustedHour -= 12;
      //         }
      //     }
      
      //     return `${adjustedHour}:${minute} ${amOrPm}`;
      // }    

      // const { date, time } = splitDateTime(event.date)
      // const formattedTime = convertToAMPM(time)


    // 2 --- Create a PetDetails component that accepts a single Pet (we will map to this)

    


  return (
    <div>s
      <h1>User Information:</h1>
      {userData ? (
        <div>
          <div>
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>

          </div>
          <div>
            Placeholder: Display Pets
          </div>
          <div>
            <EventsList />
          </div>
        </div>

      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserPage;
