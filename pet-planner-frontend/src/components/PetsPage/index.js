import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PetCards from '../PetCards';
import './index.css';


const PetsPage = ({ pets }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // // Pet Card Related
  const petList = Object.values(pets);

  // Pets Display Logic
  let petDisplay;
  if (petList.length > 0) {
    petDisplay = petList.map(pet => (
      <PetCards key={pet.id} pet={pet} />
    ));
  } else {
    petDisplay = (
      <div className='no-pets__container'>
        <div className='no-pets__text'>
          No pets found.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='userpage__pets-header'>
        Your Pets:
      </div>
      <Link className='userpage__add-pet-link'
        to='/pets/new'>Add a Pet</Link>

      {petList.length > 0 && (
        <div className='userpage__pets'>
          {petDisplay}
        </div>)};
    </>
  )
};

export default PetsPage;
