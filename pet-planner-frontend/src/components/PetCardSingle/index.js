import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getOnePet, getPetEvents } from '../../store/pets';
import EventCards from '../EventCards';
import './index.css';

function PetCardSingle() {

    //Data-related
    const { petId } = useParams();
    console.log('petId', petId);
    const targetPet = useSelector(state => state.pets.pets.petId);
    console.log('targetPet', targetPet);
    const dispatch = useDispatch();

    //Event-related
    const events = targetPet.events;
    console.log('events', events);
    const eventsList = Object.values(events);
    const futureEvents = eventsList.filter(event => event.date >= new Date().toISOString());
    const pastEvents = eventsList.filter(event => event.date < new Date().toISOString());

    let futureEventDisplay;
    let pastEventDisplay;

    if (futureEvents.length > 0) {
        futureEventDisplay = (
            futureEvents.map(event => (
                <EventCards key={event.id} event={event} />
            ))
        )
    } else {
        futureEventDisplay = (
            <>
                <div className='no-events__container'>
                    <div className='no-events__text'> There are current no upcoming events for you. </div>
                </div>
            </>
        )
    };

    if (pastEvents.length > 0) {
        pastEventDisplay = (
            pastEvents.map(event => (
                <EventCards key={event.id} event={event} />
            ))
        )
    } else {
        pastEventDisplay = (
            <>
                <div className='no-events__container'>
                    <div className='no-events__text'> There are no attended events in your history. </div>
                </div>
            </>
        )
    };



    //State-related
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (targetPet.id !== petId) {
            // console.log('attempting to retrieve pet', petId);
            dispatch(getOnePet(petId));
            dispatch(getPetEvents(petId));
        }
    }, [petId, dispatch]);

    useEffect(() => {
        if (targetPet.id === petId) {
            console.log('loading for targetPet', targetPet);
            dispatch(getOnePet(petId));
            dispatch(getPetEvents(petId));
            setLoading(false);
        }
    }, [targetPet]);

    // Loading check
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
            <div className='pet-card__container'>

                <div className="pet-card__img-container">
                    <img className='pet-card__img' alt="Pet Image" src={targetPet.petPicture} />
                </div>

                <div className='pet-card__details'>

                    <div className='pet-card__name'>
                        Name: {targetPet.petName}
                    </div>

                    <div className='pet-card__species'>
                        Species: {targetPet.species}
                    </div>

                    <div className='pet-card__birthdate'>
                        Birthday: {targetPet.birthdate}
                    </div>

                    <div className='pet-card__temparement'>
                        {targetPet.temparement}
                    </div>

                    <div className='pet-card__description'>
                        {targetPet.description}
                    </div>

                </div>

                <div className='pet-card__buttons'>
                    <Link className='pet-card__edit-button' to={`/pets/${targetPet.id}/update`} >Update Pet</Link>
                    <button className='pet-card__delete-button'>Delete Pet</button>
                </div>

                <div className='pet-card__events'>
                    <div className='pet-card__events-header'>
                         Upcoming Events:
                    </div>
                    <div className='pet-card__events-list'>
                        {futureEventDisplay}
                    </div>

                    <div className='pet-card__events-header'>
                        Past Events:
                    </div>
                    <div className='pet-card__events-list'>
                        {pastEventDisplay}
                    </div>
                </div>
            </div>
    )

}

export default PetCardSingle;
