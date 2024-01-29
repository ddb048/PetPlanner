import React from 'react';
import './index.css';

const UpdateEventModal = () => {
    return (
        <div className="update-event__container">
            <div className="update-event__title">Update Event</div>
            <form className="update-event__form">
                <div className="update-event__errors"></div>
                <div className="update-event__input-container">
                    <label htmlFor="date" className="update-event__label">Date</label>
                    <input
                        name="date"
                        type="text"
                        placeholder="Date"
                        className="update-event__input"
                    />
                </div>
                <div className="update-event__input-container">
                    <label htmlFor="duration" className="update-event__label">Duration</label>
                    <input
                        name="duration"
                        type="text"
                        placeholder="Duration"
                        className="update-event__input"
                    />
                </div>
                <div className="update-event__input-container">
                    <label htmlFor="address" className="update-event__label">Address</label>
                    <input
                        name="address"
                        type="text"
                        placeholder="Address"
                        className="update-event__input"
                    />
                </div>
                <div className="update-event__input-container">
                    <label htmlFor="description" className="update-event__label">Description</label>
                    <input
                        name="description"
                        type="text"
                        placeholder="Description"
                        className="update-event__input"
                    />
                </div>
                <div className="update-event__button-container">
                    <button className="update-event__button" type="submit">Update Event</button>
                </div>
            </form>
        </div>
    );


}

export default UpdateEventModal;
