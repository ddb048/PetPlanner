import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneEvent } from '../../store/events';
import './index.css';

function EventCardSingle() {

    //Data-related
    const { eventId } = useParams();
    const targetEvent = useSelector(state => state.events.OneEvent);
    // console.log("Target Event here",targetEvent)
    const dispatch = useDispatch();

    //State-related
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (targetEvent.id !== eventId) {
            dispatch(getOneEvent(eventId));
            console.log('attempting to retrieve event', eventId);
        }
    }, [eventId, dispatch]);

    useEffect(() => {
        if (targetEvent) {
            setLoading(false);
        }
    }, [targetEvent]);


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

    // Loading check
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!targetEvent.date) {
        return <div>Event data is not available.</div>;
    }

    const { date, time } = splitDateTime(targetEvent.date)
    const formattedTime = convertToAMPM(time)

    return (
            <div className='event-card__container'>

                <div className='event-card__details'>

                    <div className='event-card__name'>
                        {targetEvent.name}
                    </div>

                    <div className='event-card__datetime'>
                        {date} &middot; {formattedTime}
                    </div>

                    <div className='event-card__duration'>
                        Duration: {targetEvent.duration} minutes
                    </div>

                    <div className='event-card__address'>
                        {targetEvent.address}
                    </div>

                    <div className='event-card__description'>
                        {targetEvent.description}
                    </div>

                </div>
            </div>
    )
}

export default EventCardSingle
