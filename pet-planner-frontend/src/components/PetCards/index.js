import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';

function PetCards({ pet }) {

    //console.log('pet threaded in to PetCards', pet)

    //Data-related
    const navigate = useNavigate();
    const allPets = useSelector(state => state.pets.pets)
    const user = useSelector(state => state.session.user);

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

    return (

        <div className="pet-card__container-wrapper">
        <Link className="pet-card__link-container" to={`/pets/${pet.id}`} >
            <div className='pet-card__container'>

                    <div className='pet-card__door'>

                    <div className='pet-card__name'>
                            {pet.petName}
                        </div>
                     </div>
        </div>


        </Link>
        </div>
    )

}

export default PetCards
