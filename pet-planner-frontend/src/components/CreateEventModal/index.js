import React, { useState } from "react";

const CreateEventModal = ({ onClose, onCreateEvent }) => {
    const [newEvent, setNewEvent] = useState({
        date: '',
        description: '',
    });

    const handleNewEventChange = (e) => {
        const { name, value } = e.target;
        setNewEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
    };

    const handleCreateEvent = (e) => {
        e.preventDefault();
        onCreateEvent(newEvent);
        onClose();
    };

    const handleBackdropClick = (event) => {
        if (event.target.classList.contains('modal-backdrop')) {
            onClose();
        }
    };

    return (
        <div className='modal-backdrop' onClick={handleBackdropClick}>
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-title">Create a New Event</div>
                    <form onSubmit={handleCreateEvent}>
                        <input
                            className="modal-input"
                            type="text"
                            name="date"
                            placeholder="Date"
                            value={newEvent.date}
                            onChange={handleNewEventChange}
                            required
                        />
                        <input
                            className="modal-input"
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={newEvent.description}
                            onChange={handleNewEventChange}
                            required
                        />
                        <div className='modal-button-container'>
                            <button className="modal-button" type="submit">Create Event</button>
                            <button className="modal-button" type="button" onClick={onClose}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateEventModal;
