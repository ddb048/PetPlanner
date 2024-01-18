import React, { useState } from "react";
import './index.css';

const CreateEventModal = ({ onClose, onCreateEvent }) => {
    const [newEvent, setNewEvent] = useState({
        date: '',
        duration: '', // Added field
        address: '',  // Added field
        description: '',
    });
    const [dateInputType, setDateInputType] = useState("text");
    const [errors, setErrors] = useState({});

    const handleDateFocus = () => {
        setDateInputType("date");
    };

    const handleDateBlur = () => {
        if (!newEvent.date) {
            setDateInputType("text");
        }
    };

    const validate = () => {
        let newErrors = {};

        // Check if the date is filled in
        if (!newEvent.date) {
            newErrors.date = "Date is required";
        }

        // Validate duration (example: it should be a number)
        if (!newEvent.duration) {
            newErrors.duration = "Duration is required";
        } else if (isNaN(newEvent.duration)) {
            newErrors.duration = "Duration must be a number";
        }

        // Validate address
        if (!newEvent.address) {
            newErrors.address = "Address is required";
        } else if (newEvent.address.length < 5) { // Example length check
            newErrors.address = "Address must be at least 5 characters long";
        }

        // Validate description
        if (!newEvent.description) {
            newErrors.description = "Description is required";
        } else if (newEvent.description.length < 10) { // Example length check
            newErrors.description = "Description must be at least 10 characters long";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNewEventChange = (e) => {
        const { name, value } = e.target;
        setNewEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
    };

    const handleCreateEvent = (e) => {
        e.preventDefault();
        if (!validate()) return;
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
            <div className="create-event-modal">
                <div className="modal-content">
                    <div className="modal-title">Create a New Event</div>
                    <div className="modal-main">
                        <form className="create-event-form" onSubmit={handleCreateEvent}>
                            <input
                                className="modal-input"
                                type={dateInputType}
                                name="date"
                                placeholder="Pick a Date for your Event"
                                onFocus={handleDateFocus}
                                onBlur={handleDateBlur}
                                value={newEvent.date}
                                onChange={handleNewEventChange}
                                required
                            />
                            <input
                                className="modal-input"
                                type="text"
                                name="duration"
                                placeholder="Duration"
                                value={newEvent.duration}
                                onChange={handleNewEventChange}
                            />
                            <input
                                className="modal-input"
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={newEvent.address}
                                onChange={handleNewEventChange}
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
                        <div className="tips-for-a-great-event">
                            <h3 className="tips-event-title">Tips for a great event</h3>
                            <p className="tip-small-titles">
                                Pick a date from the calendar that works for everyone
                            </p>
                            <p className="tip-small-under">
                                Set your duration in minutes.  1 hour would be 60 minutes.  2 hours would be 120 minutes.
                            </p>
                            <p className="tip-small-under">
                                Make the address easy to identify for any member to identify.
                            </p>
                            <p className="tip-small-titles">
                                Describe things in a clear order so it's easy to digest. Start with an overall description of the event and include a basic agenda, before you move into really specific details.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CreateEventModal;
