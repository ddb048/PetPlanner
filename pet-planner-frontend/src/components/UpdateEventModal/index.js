import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editOneEvent, getOneEvent } from '../../store/events';
import './index.css';

const UpdateEventModal = () => {

    const { eventId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //User-Checking to ensure user is logged in
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    useEffect(() => {
        dispatch(getOneEvent(eventId));
    }, [eventId, dispatch]);

    //*****************************STATE************************* */

    const targetEvent = useSelector(state => state.events.OneEvent);

    const [eventName, setEventName] = useState(targetEvent ? targetEvent.eventName : '');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [utcDate, setUtcDate] = useState(targetEvent ? targetEvent.date : '');
    const [eventDuration, setEventDuration] = useState(targetEvent ? targetEvent.duration : '');
    const [eventAddress, setEventAddress] = useState(targetEvent ? targetEvent.address : '');
    const [eventDescription, setEventDescription] = useState(targetEvent ? targetEvent.description : '');
    const [eventPictureUrl, setEventPictureUrl] = useState(targetEvent ? targetEvent.eventPictureUrl : '');
    const [dateInputType, setDateInputType] = useState('text');
    const [backendErrors, setBackendErrors] = useState('');

    //field error states
    const [eventNameError, setEventNameError] = useState('');
    const [eventDateError, setEventDateError] = useState('');
    const [eventDurationError, setEventDurationError] = useState('');
    const [eventAddressError, setEventAddressError] = useState('');
    const [eventDescriptionError, setEventDescriptionError] = useState('');
    const [eventPictureUrlError, setEventPictureUrlError] = useState('');
    const [renderErr, setRenderErr] = useState(false);

    //**************************HELPERS************************** */

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

    //**************************USE EFFECT************************** */

    useEffect(() => {

        //name error handling
        if (!eventName?.length) {
            setEventNameError('Please enter a name for your event');
        } else if (eventName?.length > 50) {
            setEventNameError('Name must be 50 characters or less');
        } else {
            setEventNameError('');
        }

        //date error handling
        if (!eventDate?.length) {
            setEventDateError('Please enter a date for your event');
        } else if (eventDate - new Date() < 0) {
            setEventDateError('Date must be in the future');
        } else {
            setEventDateError('');
        }

        //duration error handling
        if (eventDuration?.length === 0) {
            setEventDurationError('Please enter a duration for your event');
        } else if (eventDuration < 0) {
            setEventDurationError('Duration must be a positive number');
        } else if (isNaN(eventDuration)) {
            setEventDurationError('Duration must be a number');
        } else {
            setEventDurationError('');
        }

        //address error handling
        if (!eventAddress?.length) {
            setEventAddressError('Please enter an address for your event');
        } else if (eventAddress?.length > 100) {
            setEventAddressError('Address must be 100 characters or less');
        } else {
            setEventAddressError('');
        }

        //description error handling
        if (!eventDescription?.length) {
            setEventDescriptionError('Please enter a description for your event');
        } else if (eventDescription?.length > 500) {
            setEventDescriptionError('Description must be 500 characters or less');
        }   else {
            setEventDescriptionError('');
        }

        //image error handling
        if (!eventPictureUrl?.length) {
            setEventPictureUrlError('Please enter an image URL for your event');
        } else if (!urlValidation(eventPictureUrl)) {
            setEventPictureUrlError('Images must be formatted as .png, .jpg, .jpeg, or .gif');
        } else {
            setEventPictureUrlError('');
        }

        setBackendErrors('');

    }, [dispatch, eventName, eventDate, eventDuration, eventAddress, eventDescription, eventPictureUrl]);

    //**************************ON SUBMIT************************** */

    const handleSubmit = async (event) => {
        event.preventDefault();
        setRenderErr(true);

        // Combine and convert date and time to UTC
        const combinedDate = await toUTCString(eventDate, eventTime);

        setUtcDate(combinedDate)
        console.log("This is the combined date", combinedDate)

        if (

            !eventNameError.length &&
            !eventDateError.length &&
            !eventDurationError.length &&
            !eventAddressError.length &&
            !eventDescriptionError.length &&
            !eventPictureUrlError.length

        ) {

            const updatedEvent = {
                id: targetEvent.id,
                user: { id: user.id},
                eventName: eventName,
                date: combinedDate,
                duration: eventDuration,
                address: eventAddress,
                description: eventDescription,
                eventPictureUrl,
            };

            console.log("This is being sent to dispatch as updatedEvent",updatedEvent)

            const event = await dispatch(editOneEvent(updatedEvent));
            if (event) {
                navigate(`/events/${targetEvent.id}`)
            };
        }

    };

    //**************************RETURN************************** */

    if (!targetEvent) {
        return <div>Loading event data...</div>;
    };

    return (
        <div className='modal-backdrop'>
            <div className="create-event-modal">
                <div className="modal-content">
                    <div className="modal-title">Update an Event</div>
                    <div className="modal-main">
                        <div className='errors__container'>{backendErrors}</div>
                        <form className="create-event-form" onSubmit={handleSubmit}>
                            <div className="modal-input-container">
                                Event Name:
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
                                {!!renderErr && eventNameError?.length > 0 && eventNameError}
                            </div>
                            <div className="modal-input-container">
                                Event Date & Time:
                                <input
                                    className="modal-input"
                                    type="date"
                                    name="eventDate"
                                    placeholder="YYYY-MM-DD" // Adjust placeholder as per type change
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
                                    required
                                />
                            </div>
                            <div className='errors__container'>
                                {!!renderErr && eventDateError?.length > 0 && eventDateError}
                            </div>
                            <div className="modal-input-container">
                                Event Duration:
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
                                {!!renderErr && eventDurationError?.length > 0 && eventDurationError}
                            </div>
                            <div className="modal-input-container">
                                Event Address:
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
                                {!!renderErr && eventAddressError?.length > 0 && eventAddressError}
                            </div>
                            <div className="modal-input-container">
                                Event Picture URL:
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
                                {!!renderErr && eventPictureUrlError?.length > 0 && eventPictureUrlError}
                            </div>
                            <div className="modal-input-container">
                                Event Description:
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
                                {!!renderErr && eventDescriptionError?.length > 0 && eventDescriptionError}
                            </div>

                            <div className='modal-button-container'>
                                <button className="modal-button" type="submit">Update Event</button>
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

export default UpdateEventModal;
