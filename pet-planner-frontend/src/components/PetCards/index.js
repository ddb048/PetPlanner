import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './index.css'

function PetCards({ pet }) {

    //State-related
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        if (allPets) {
            setLoading(false);
        }
    }, [allPets]);

    //Data-related
    const allPets = useSelector(state => state.pets.pets)

    //Link route below may be wrong.

    return (
        <Link className="pet-card__link-container" to={`/pets/${pet.id}`}>
            <div className='pet-card__container'>
                
                <div className="pet-card__img-container">
                    <img className='pet-card__img' alt="Pet Image" src={pet.petPicture} />
                </div>

                <div className='pet-card__details'>

                    <div className='pet-card__name'>   
                        {/* {pet.name} */}
                        Placeholder: After names have been added -- remove this line and comment in the one above.
                    </div>

                    <div className='pet-card__species'>
                        Species: {pet.species}
                    </div>
                    
                    <div className='pet-card__birthdate'>
                        Birthday: {pet.birthdate}
                    </div>

                    <div className='pet-card__temparement'>
                        {pet.temparement}
                    </div>
                    
                    <div className='pet-card__description'>
                        {pet.description}
                    </div>

                </div>
            </div>
        </Link>
    )

}

export default PetCards