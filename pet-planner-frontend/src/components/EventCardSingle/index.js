import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteOneEvent, getOneEvent } from '../../store/events';
import PetCards from '../PetCards';
import './index.css';

function EventCardSingle() {

    //Data-related
    const { eventId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.session.user);
    const pets = useSelector(state => state.pets.pets);



    useEffect(() => {
        dispatch(getOneEvent(eventId));
    }, [eventId, dispatch]);

    //State-related
    const targetEvent = useSelector(state => state.events.OneEvent || null);
    const [loading, setLoading] = useState(true);

    //Loading check
    if (!targetEvent.id) {
        return <div>Event data is not retrieved.</div>;
    };

    //Pets related
    const petArray = Object.values(targetEvent?.pets ?? {});
console.log('pets from Event Card Single', pets)
    const petDisplay = petArray.map(pet => (
        <PetCards key={pet.id} pet={pet} />
    ));

    // Date & Time Helper Functions
    function splitDateTime(dateTimeString) {
        const [date, fullTime] = dateTimeString.split('T');
        const time = fullTime.split('.')[0]
        return { date, time };
    }

    function convertToAMPM(timeString) {
        const [hour, minute] = timeString.split(':');
        let amOrPm = 'AM';
        let adjustedHour = parseInt(hour, 10);

        if (adjustedHour >= 12) {
            amOrPm = 'PM';
            if (adjustedHour > 12) {
                adjustedHour -= 12;
            }
        }

        return `${adjustedHour}:${minute} ${amOrPm}`;
    }


    const { date, time } = splitDateTime(targetEvent.date)
    const formattedTime = convertToAMPM(time)


    // helper Functions to UpdateEvent and DeleteEvent

    const handleUpdateEvent = (e) => {
        e.preventDefault();
        navigate(`/events/${targetEvent.id}/update`);
    }

    const handleDeleteEvent = (e) => {
        e.preventDefault();
        dispatch(deleteOneEvent(targetEvent.id))
            .then(() => {
                console.log('Event deleted successfully');
                navigate(`/events`);
            }
            )

    }

    return (

        <>
            <div className='event-card__container'>



                <div className='event-card__details'>

                    <div className='event-card__name'>
                    {targetEvent.eventName}
                    </div>

                    <div className='event-card__name'>
                    <img src= {targetEvent.eventPictureUrl}alt={targetEvent.eventName}/>
                    </div>


                    <div className='event-card__datetime'>
                    <strong>  Time of the Event: </strong> {date} &middot; {formattedTime}
                    </div>

                    <div className='event-card__duration'>
                    <strong>  Duration of the Event: </strong> {targetEvent.duration} minutes
                    </div>

                    <div className='event-card__address'>
                    <strong>  This Event will be Located at: </strong>{targetEvent.address}
                    </div>

                    <div className='event-card__description'>
                    <strong>Description of the Event: </strong> {targetEvent.description}
                    </div>


                    <div className='event-card__buttons'>
                        <button className='event-card__button' onClick={handleUpdateEvent}>Edit Event</button>
                        <button className='event-card__button' onClick={handleDeleteEvent}>Delete Event</button>
                    </div>

                </div>


            </div>

            <div className='event-card__pets'>
                    <div className='event-card__pets-title'>
                        Pets Attending:
                    </div>
                    <div className='event-card__pets-list'>
                        {petDisplay}
                    </div>
             </div>
        </>
    )
}

export default EventCardSingle
