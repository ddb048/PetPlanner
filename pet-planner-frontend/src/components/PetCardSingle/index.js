import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getOnePet, getPetEvents, removePet } from '../../store/pets';
import { restoreUser } from '../../store/session';
import EventCards from '../EventCards';
import './index.css';

function PetCardSingle() {

    //Data-related
    const { petId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //State-related
    const targetPet = useSelector(state => state.pets.OnePet);
    const user = useSelector(state => state.session.user);


    useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        if (userToken && !user) {
            dispatch(restoreUser(userToken));
        } else if (!userToken && !user) {
            navigate('/');
        }
    }, [user, dispatch, navigate]);


    // useEffect(() => {
    //     if (!user) {
    //         navigate('/');
    //     }
    // }, [user, navigate]);

    //Event-related
    const events = targetPet.events || {} ;

    // console.log('events', events);
    let futureEventDisplay;
    let pastEventDisplay;

    if (events) {

    const eventsList = Object.values(events);
    const futureEvents = eventsList.filter(event => event.date >= new Date().toISOString());
    const pastEvents = eventsList.filter(event => event.date < new Date().toISOString());

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

};





    //State-related
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (targetPet.id !== petId) {
            // console.log('attempting to retrieve pet', petId);
            dispatch(getOnePet(petId));
            dispatch(getPetEvents(petId));
            setLoading(false);
        }
    }, [petId, dispatch, targetPet.id]);

    // useEffect(() => {
    //     if (targetPet.id === petId) {
    //         console.log('loading for targetPet', targetPet);
    //         dispatch(getOnePet(petId));
    //         dispatch(getPetEvents(petId));
    //         setLoading(false);
    //     }
    // }, [targetPet]);

    // Loading check
    if (loading) {
        return <div>Loading...</div>;
    }

    //Helper Functions
    const handleUpdatePet = (e) => {
        e.preventDefault();
        navigate(`/pets/${petId}/update`);
    }

    const handleDeletePet = async () => {
        if (window.confirm("Are you sure you want to delete this pet?")) {
            try {
                const response = await dispatch(removePet(petId));
                if (!response.ok) {
                    console.error(`Error deleting pet. Status: ${response.status}, Message: ${await response.text()}`);
                }
                // Other handling logic
            } catch (error) {
                console.error("Error deleting pet:", error);
                // Handle other errors
            }
        }

        navigate('/pets');
    };


    return (
        <>
            <div className='pet-card__container_single'>

                <div className='pet-card__name_single'>
                       {targetPet.petName}
                    </div>

                <div className="pet-card__img-container">
                    <img className='pet-card__img' alt="Pet" src={targetPet.petPicture} />
                </div>

                <div className='pet-card__details'>


                    <div className='pet-card__species'>
                    <strong> Species: </strong>  {targetPet.species}
                    </div>

                    <div className='pet-card__birthdate'>
                    <strong> Birthday:</strong> {targetPet.birthdate}
                    </div>

                    <div className='pet-card__temparement'>
                    <strong> Temparement: </strong>{targetPet.temparement}
                    </div>

                    <div className='pet-card__description'>
                    <strong> Description:</strong> {targetPet.description}
                    </div>

                </div>

                <div className='pet-card__buttons'>
                    <button className='pet-card__edit-button' onClick={handleUpdatePet} >Update Pet</button>
                    <button className='pet-card__delete-button'  onClick={handleDeletePet} >Delete Pet</button>
                </div>




            </div>
                {
                    futureEventDisplay && (
                <div className='pet-card__events'>
                    <div className='pet-card__events-header'>
                      <strong> Upcoming Events:</strong>
                    </div>
                    <div className='pet-card__events-list'>
                        {futureEventDisplay}
                    </div>
                </div>
                    )
                    }

            {
                pastEventDisplay && (
                    <div className='pet-card__events'>
                        <div className='pet-card__events-header'>
                            Past Events:
                        </div>
                        <div className='pet-card__events-list'>
                            {pastEventDisplay}
                        </div>
                    </div>
                )
            }

        </>
    )

}

export default PetCardSingle;
