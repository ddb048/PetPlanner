import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const DisplayPets = ({ pets }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { state } = location;
    if (state && state.newPet) {
      console.log('Newly created pet information:', state.newPet);
    }
  }, [location]);

  const handleDeletePet = (petId) => {
    // Send a request to your API to delete the pet
    fetch(`http://localhost:8080/api/pets/${petId}`, {
      method: 'DELETE',
    })
      .catch((error) => console.error('Error deleting pet:', error));
  };

  const handleViewPetEvents = (petId) => {
    navigate(`/pet/${petId}/events`);
  };

  return (
    <div>
      <h1>Welcome!!! Here are your PetPals!!!</h1>
      <h2>Click on your pet to see what events they have: </h2>

    
        <p>Your PetPlanner is empty. <Link to="/create-pet">Let's Create Your Pet's Profile!</Link></p>
     
       
      
    </div>
  );
};

export default DisplayPets;