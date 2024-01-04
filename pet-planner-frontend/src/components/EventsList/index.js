import React from 'react';
import CreateEventModal from '../CreateEventModal';
import './index.css';

const EventsList = ({ events, onCreateEvent, onDeleteEvent, showCreateEventModal, handleShowCreateEventModal, handleCloseModal }) => {
    return (
        <>
            <h2> Events: </h2>
            <button onClick={handleShowCreateEventModal}>Host an Event</button>
            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        <input type="checkbox" />
                        <p>{event.date}: {event.description}</p>
                        <button onClick={() => onDeleteEvent(event.id)}>Delete Event</button>
                    </li>
                ))}
            </ul>

        
            {showCreateEventModal && (
                <CreateEventModal onClose={handleCloseModal} onCreateEvent={onCreateEvent} />
            )}
        </>
    );
};

export default EventsList;
