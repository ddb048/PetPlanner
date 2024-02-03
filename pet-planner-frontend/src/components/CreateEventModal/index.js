import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createEvent, getUserEvents } from "../../store/events";
import './index.css';

const CreateEventModal = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    // console.log('user in create Event Modal', user);

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    //**********************STATE******************** */
    const [eventName, setEventName] = useState("");
    const [eventPictureUrl, setEventPictureUrl] = useState("");
    const [eventDate, setEventDate] = useState("");
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


    //***********************FUNCTIONS******************* */

    const urlValidation = str => {
        return /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/.test(str);
    }

    const handleDateFocus = () => {
        setDateInputType("date");
    };

    const handleDateBlur = () => {
        if (!eventDate) {
            setDateInputType("text");
        }
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

            const event = await dispatch(createEvent(newEvent));
            // console.log('event in create event modal after dispatch to create event', event)
            if (event) {

                navigate(`/events/${event.id}`);
            }

        }
    };


    //***********************RETURN********************* */


    return (
        <div className='modal-backdrop'>
            <div className="create-event-modal">
                <div className="modal-content">
                    <div className="modal-title">Create a New Event</div>
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
                                {!!renderErr && eventNameError.length > 0 && eventNameError}
                            </div>
                            <div className="modal-input-container">
                            Event Date:
                            <input
                                className="modal-input"
                                type={dateInputType}
                                name="date"
                                placeholder="Pick a Date for your Event"
                                onFocus={handleDateFocus}
                                onBlur={handleDateBlur}
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                                required
                            />
                            </div>
                            <div className='errors__container'>
                                {!!renderErr && dateError.length > 0 && dateError}
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
                                {!!renderErr && durationError.length > 0 && durationError}
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
                                {!!renderErr && addressError.length > 0 && addressError}
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
                                {!!renderErr && eventPictureUrlError.length > 0 && eventPictureUrlError}
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
                                {!!renderErr && descriptionError.length > 0 && descriptionError}
                            </div>

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
