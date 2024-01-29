import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './index.css';

function PetCards({ pet }) {

    console.log('pet threaded in to PetCards', pet)

    //Data-related
    const allPets = useSelector(state => state.pets.pets)

    //State-related
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (allPets) {
            setLoading(false);
        }
    }, [allPets]);

    // Loading check
    if (loading) {
        return <div>Loading...</div>;
    }

    //Link route below may be wrong.

    return (
        <Link className="pet-card__link-container" to={`/pets/${pet.id}`}>
            <div className='pet-card__container'>
            <div className='pet-card__name'>
                        {pet.petName}
                    </div>

                <div className="pet-card__img-container">
                    <img className='pet-card__img' alt="Pet Image" src={pet.petPicture} />
                </div>

                <div className='pet-card__details'>

                    
                <div className='pet-card__birthdate'>
                        Birthday: {pet.birthdate}
                    </div>

                    <div className='pet-card__species'>
                        Species: {pet.species}
                    </div>
                    <div className='pet-card__temparement'>
                    Temparement: {pet.temparement}
                    </div>

                    <div className='pet-card__description'>
                    Description :{pet.description}
                    </div>

                </div>
            </div>
        </Link>
    )

}

export default PetCards
