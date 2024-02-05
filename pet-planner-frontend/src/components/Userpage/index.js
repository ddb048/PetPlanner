import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { restoreUser } from '../../store/session';
import EventCards from '../EventCards';
import PetCards from '../PetCards';
import './index.css';

const UserPage = ({ user, pets, events }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken && !user) {
      dispatch(restoreUser(userToken));
    }
  }, [user, dispatch]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  const [loading, setLoading] = useState(true);

  // Data filtering
  const targetEvents = Object.values(events);
  const futureEvents = targetEvents.filter(event => new Date(event.date) >= new Date());
  const pastEvents = targetEvents.filter(event => new Date(event.date) < new Date());
  const targetPets = Object.values(pets);

  // Delay loading simulation
  if (loading) {
    setTimeout(() => setLoading(false), 2500);
  }

  return (
    <div className='userpage_main'>

        {user ? (
          <div className='userpage__content'>
            {user.username && <div className='userpage__username'>🧑‍💻 <strong> Username:</strong> {user.username}</div>}
            {user.email && <div className='userpage__email'>📧 <strong>Email:</strong> {user.email}</div>}

            <div className='userpage__pets-header'>🐾Your Pets 🐾</div>
            <Link className='userpage__add-pet-link' to='/pets/new'>
              
               Add a Pet
              
              </Link>


              {targetPets.length > 0 ? (
                <div className='eventspage__events'>
                <Slider {...settings}>
                  {targetPets.map(pet => <PetCards key={pet.id} pet={pet} />)}
                </Slider>
                </div>
              ) : (
                <div className='no-pets__container'>
                  <div className='no-pets__text'>No pets found.</div>
                </div>
              )}


            <div className='userpage__events-section'>
          
               <strong >⏰ Upcoming Events 🦜</strong> 
                
                <div className='add-event-container'>
    <Link className='userpage__add-event-link' to='/events/new'>
      Add Event
    </Link>
  </div>
                
                {futureEvents.length > 0 ? (
                  <div className='eventspage__events'>
                  <Slider {...settings}>
                    {futureEvents.map(event => <EventCards key={event.id} event={event} />)}
                  </Slider>
                  </div>
                ) : (
                  <div className='no-events__container'>
                    <div className='no-events__text'>There are no upcoming events for you.</div>
                  </div>
                )}
    


                Past Events:
                {pastEvents.length > 0 ? (
                  <div className='eventspage__events'>
                  <Slider {...settings}>
                    {pastEvents.map(event => <EventCards key={event.id} event={event} />)}
                  </Slider>
                  </div>
                ) : (
                  <div className='no-events__container'>
                    <div className='no-events__text'>There are no attended events in your history.</div>
                  </div>
                )}

            </div>
          </div>
        ) : (
          <div className='userpage__loading'>🦎 Loading user's pet data page...  🕒</div>
        )}

    </div>
  );
};

export default UserPage;
