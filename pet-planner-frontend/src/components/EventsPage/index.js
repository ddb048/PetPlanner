import React from 'react';
import { Link } from 'react-router-dom';
import EventCards from '../EventCards';
import './index.css';

const EventsPage = ({ events }) => {

    const eventList = Object.values(events);
    let eventDisplay;
    if (eventList.length > 0) {
        eventDisplay = eventList.map(event => (
            <EventCards key={event.id} event={event} />
        ));
    } else {
        eventDisplay = (
            <div className='no-events__container'>
                <div className='no-events__text'>
                    No events found.
                </div>
            </div>
        );
    };

    return (
        <>
        
            <div className='userpage__events-header'>
                Your Events:
            </div>
            <Link className='userpage__add-event-link'
                to='/events/new'>Add an Event</Link>

            {eventList.length > 0 && (
                <div className='userpage__events'>
                    {eventDisplay}
                </div>
                )};

           
        </>
    )

 };

 export default EventsPage;
