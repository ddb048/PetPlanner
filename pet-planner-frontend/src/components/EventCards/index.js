import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './index.css';

function EventCards({ event }) {

    //Data-related
    const allEvents = useSelector(state => state.events.events);

    //State-related
    const [ loading, setLoading ] = useState(true);

    useEffect( () => {
        if (allEvents) {
            setLoading(false);
        }
    }, [allEvents]);


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

    const { date, time } = splitDateTime(event.date)
    const formattedTime = convertToAMPM(time)
    const numAttendees = event.pets.length;


    // Loading check
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Link className="event-card__link-container" to={`/events/${event.id}`}>
            <div className='event-card__container'>

            <div className='event-card__name'>
                          {event.eventName}
                        </div>
                <div className='event-card__pic-container'>
                             <img src={event.eventPictureUrl} />
                         </div>

                <div className='event-card__details'>
                    
                    
                    
                    <div className='event-card__text-container'>
                      


                       
                        <div className='event-card__datetime'>
                          Start:   {date} &middot; {formattedTime}
                        </div>

                        <div className='event-card__address'>
                           Address: {event.address}
                        </div>

                        <div className='event-card__duration'>
                            Duration: {event.duration} minutes
                        </div>

                        <div className='event-card__attendees'>
                            Sign-ups: {numAttendees}
                        </div>

                        <div className='event-card__description'>
                        Description: {event.description}
                        </div>
                    </div>

                </div>
            </div>
        </Link>
    )
}

export default EventCards
