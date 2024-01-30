import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import EventCards from '../EventCards';
import PetCards from '../PetCards';
import './index.css';

const UserPage = ({ user, pets, events }) => {

  //State-related
  //const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Event-Data and date filtering for display
  const targetEvents = Object.values(events);
  const futureEvents = targetEvents.filter(event => event.date >= new Date().toISOString());
  const pastEvents = targetEvents.filter(event => event.date < new Date().toISOString());

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
  const targetPets = Object.values(pets);

  // Pets Display Logic
  let petDisplay;
  if (targetPets.length > 0) {
    petDisplay = targetPets.map(pet => (
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

  // Loading Logic
  if (loading) {
    setTimeout(() => {
      setLoading(false);
    } , 2500);
  };

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
          {targetPets.length > 0 && (
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
