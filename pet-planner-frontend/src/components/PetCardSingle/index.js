import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOnePet } from '../../store/pets';
import './index.css';

function PetCardSingle() {

    //Data-related
    const { petId } = useParams();
    const targetPet = useSelector(state => state.pets.OnePet);
    const dispatch = useDispatch();

    //State-related
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (targetPet.id !== petId) {
            // console.log('attempting to retrieve pet', petId);
            dispatch(getOnePet(petId));
        }
    }, [petId, dispatch]);

    useEffect(() => {
        if (targetPet) {
            console.log('loading for targetPet', targetPet);

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
            </div>
    )

}

export default PetCardSingle;
