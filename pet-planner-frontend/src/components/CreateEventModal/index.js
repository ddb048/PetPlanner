import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createEvent, getUserEvents } from "../../store/events";
import { restoreUser } from "../../store/session";
import './index.css';

const CreateEventModal = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    // console.log('user in create Event Modal', user);

    useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        if (userToken && !user) {
            dispatch(restoreUser(userToken));
        }
    }, [user, dispatch]);

    //**********************STATE******************** */
    const [eventName, setEventName] = useState("");
    const [eventPictureUrl, setEventPictureUrl] = useState("");
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [utcDate, setUtcDate] = useState('');
    const [eventDuration, setEventDuration] = useState("");
    const [eventAddress, setEventAddress] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [dateInputType, setDateInputType] = useState("text");
    const [backendErrors, setBackendErrors] = useState("");

    //field error states
    const [eventNameError, setEventNameError] = useState("");
    const [eventPictureUrlError, setEventPictureUrlError] = useState("");
    const [dateError, setDateError] = useState("");
    const [durationError, setDurationError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [renderErr, setRenderErr] = useState(false);


    //***********************HELPERS******************* */

    const urlValidation = str => {
        return /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/.test(str);
    }

    // Function to convert local date and time to UTC string.
    const toUTCString = (date, time) => {
        // Combine date and time with 'T' separator
        const localDateTime = new Date(`${date}T${time}`);
        // Convert to UTC string
        return localDateTime.toISOString();
    };

    const onClose = () => {
        navigate('/UserPage');
    };

    //***********************USE EFFECT********************* */

    useEffect(() => {

        //event name error handling
        if (!eventName.length) {
            setEventNameError('Please enter a name for your event');
        } else if (eventName.length > 50) {
            setEventNameError('Name must be 50 characters or less');
        } else {
            setEventNameError('');
        }

        //event picture url error handling
        if (!eventPictureUrl.length) {
            setEventPictureUrlError('Please enter a picture url for your event');
        } else if (!urlValidation(eventPictureUrl)) {
            setEventPictureUrlError('Please enter a valid url');
        } else {
            setEventPictureUrlError('');
        }

        //date error handling
        if (!eventDate.length) {
            setDateError('Please enter a date for your event');
        } else if (eventDate - new Date() < 0) {
            setDateError('Date must be in the future');
        } else {
            setDateError('');
        }

        //duration error handling
        if (!eventDuration.length) {
            setDurationError('Please enter a duration for your event');
        } else if (isNaN(eventDuration)) {
            setDurationError('Duration must be a number');
        } else if (eventDuration < 0) {
            setDurationError('Duration must be a positive number');
        } else {
            setDurationError('');
        }

        //address error handling
        if (!eventAddress.length) {
            setAddressError('Please enter an address for your event');
        } else if (eventAddress.length > 100) {
            setAddressError('Address must be 100 characters or less');
        } else {
            setAddressError('');
        }

        //description error handling
        if (!eventDescription.length) {
            setDescriptionError('Please enter a description for your event');
        } else if (eventDescription.length > 500) {
            setDescriptionError('Description must be 500 characters or less');
        } else {
            setDescriptionError('');
        }

        setBackendErrors('');

    }, [dispatch, eventName, eventPictureUrl, eventDate, eventDuration, eventAddress, eventDescription]);


    useEffect(() => {

        dispatch(getUserEvents(user.id))
            .then(() => {
                // console.log("users event dispatched")
            }
            )
            .catch(() => setBackendErrors('Failed to create event'));
        }, [dispatch, user.id]);


    //***********************ON SUBMIT********************* */

    const handleSubmit = async (event) => {
        event.preventDefault();
        setRenderErr(true);

        if (

            !eventNameError.length &&
            !eventPictureUrlError.length &&
            !dateError.length &&
            !durationError.length &&
            !addressError.length &&
            !descriptionError.length
        ) {
            const newEvent = {
                eventName,
                eventPictureUrl,
                date: eventDate,
                duration: eventDuration,
                address: eventAddress,
                description: eventDescription,
                user: {id: user.id},
            };

            console.log('newEvent from component step1', newEvent);
            const event = await dispatch(createEvent(newEvent));

            console.log('event from component step4', event);

            if (event) {
                navigate(`/events/${event.id}`);
            };

        }
    };


    //***********************RETURN********************* */


    return (
        <div className='modal-backdrop'>
            <div className="create-event-modal">
                <div className="modal-content">
                    <div className="modal-title">🎉 Create a New Event 📝</div>
                    <div className="modal-main">
                        <div className='errors__container'>{backendErrors}</div>
                        <form className="create-event-form" onSubmit={handleSubmit}>
                            <div className="modal-input-container">
                          <strong>🌟 Event Name:</strong>  
                            <input
                                className="modal-input"
                                type="text"
                                name="eventName"
                                placeholder="Event Name"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                                required
                            />
                            </div>
                            <div className='errors__container'>
                                {!!renderErr && eventNameError.length > 0 && eventNameError}
                            </div>

                            <div className="modal-input-container">
                               <strong>🕒 Event Date & Time:</strong> 
                                <input
                                    className="modal-input"
                                    type="date"
                                    name="eventDate"
                                    placeholder="YYYY-MM-DD"
                                    value={eventDate}
                                    onChange={(e) => setEventDate(e.target.value)}
                                    required
                                />
                                <input
                                    className="modal-input"
                                    type="time"
                                    name="eventTime"
                                    value={eventTime}
                                    onChange={(e) => setEventTime(e.target.value)}
                                    step="1800"
                                    required
                                />
                            </div>
                            <div className='errors__container'>
                                {!!renderErr && dateError.length > 0 && dateError}
                            </div>
                            <div className="modal-input-container">
                           <strong>⏳ Event Duration:</strong> 
                            <input
                                className="modal-input"
                                type="text"
                                name="duration"
                                placeholder="Duration"
                                value={eventDuration}
                                onChange={(e) => setEventDuration(e.target.value)}
                            />
                            </div>
                            <div className='errors__container'>
                                {!!renderErr && durationError.length > 0 && durationError}
                            </div>
                            <div className="modal-input-container">
                           <strong>📍 Event Address:</strong>
                            <input
                                className="modal-input"
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={eventAddress}
                                onChange={(e) => setEventAddress(e.target.value)}
                            />
                            </div>
                            <div className='errors__container'>
                                {!!renderErr && addressError.length > 0 && addressError}
                            </div>
                            <div className="modal-input-container">
                           <strong>🖼️  Event Picture URL:</strong>
                            <input
                                className="modal-input"
                                type="text"
                                name="eventPictureUrl"
                                placeholder="Event Picture URL"
                                value={eventPictureUrl}
                                onChange={(e) => setEventPictureUrl(e.target.value)}
                            />
                            </div>
                            <div className='errors__container'>
                                {!!renderErr && eventPictureUrlError.length > 0 && eventPictureUrlError}
                            </div>
                            <div className="modal-input-container">
                           <strong>📋 Event Description:</strong> 
                            <input
                                className="modal-input"
                                type="text"
                                name="description"
                                placeholder="Description"
                                value={eventDescription}
                                onChange={(e) => setEventDescription(e.target.value)}
                            />
                            </div>
                            <div className='errors__container'>
                                {!!renderErr && descriptionError.length > 0 && descriptionError}
                            </div>

                            <div className='modal-button-container_eventscreate'>
                                <button className="modal-button" type="submit">Create Event </button>
                                <button className="modal-button" type="button" onClick={onClose}>Close </button>
                            </div>
                        </form>
                        <div className="tips-for-a-great-event">
                            <h3 className="tips-event-title">Tips for a great event</h3>
                            <p className="tip-small-titles">
                            🗓️ Pick the Perfect Date: Dive into the calendar and find that golden day to have that event! 🌟
                            </p>
                            <p className="tip-small-under">
                            ⏰ Set Duration: Time is of the essence! Calculate your event minutes - 1 hour = 60 minutes, 2 hours = 120 minutes. ⌛
                            </p>
                            <p className="tip-small-under">
                            📍 Make the address crystal clear.
                            </p>
                            <p className="tip-small-titles">
                            📝 Clear Description: Lay it out like a boss! Start with the big picture, then sprinkle in the details. Keep it organized for easy digestion! 🎤🔍
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CreateEventModal;
