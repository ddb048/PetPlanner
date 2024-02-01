import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import EventCards from '../EventCards';
import './index.css';

const EventsPage = ({ events }) => {

    const navigate = useNavigate();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
    };

    const eventList = Object.values(events);

    return (
        <div className='eventsPage_main'>
            <div className='userpage__events-header'>
                Your Events:
            </div>
            <Link className='userpage__add-event-link' to='/events/new'>Add an Event</Link>

            {eventList.length > 0 ? (
                <div className='eventspage__events'>
                    <Slider {...settings}>
                        {eventList.map(event => (
                            <EventCards key={event.id} event={event} />
                        ))}
                    </Slider>
                </div>
            ) : (
                <div className='no-events__container'>
                    <div className='no-events__text'>
                        No events found.
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventsPage;
