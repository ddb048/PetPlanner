import React, { useState, useEffect } from 'react';
import { Link, useNavigate,useLocation } from 'react-router-dom';

const DisplayPets = () => {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // Fetch pets from your API without Authorization
    fetch('http://localhost:8080/api/pets')
      .then((response) => response.json())
      .then((data) => setPets(data))
      .catch((error) => console.error('Error fetching pets:', error));
  
    // Check if there is new pet information in the state
    const { state } = location;
    if (state && state.newPet) {
      // Use the new pet information, you can add it to the pets list or display it differently
      console.log('Newly created pet information:', state.newPet);
    }
  }, [location]);

  const handleDeletePet = (petId) => {
    // Send a request to your API to delete the pet
    fetch(`http://localhost:8080/api/pets/${petId}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Remove the deleted pet from the state
        setPets((prevPets) => prevPets.filter((pet) => pet.id !== petId));
      })
      .catch((error) => console.error('Error deleting pet:', error));
  };

  const handleViewPetEvents = (petId) => {
    // Use navigate to redirect to the pet's events page
    navigate(`/pet/${petId}/events`);
  };

  return (
    <div>
      <h1>Welcome!!! Here are your PetPals!!!</h1>
      <h2>Click on your pet to see What events they have: </h2>

      {pets.length === 0 ? (
        <p>Your PetPlanner is empty. <Link to="/create-pet">Let's Create Your Pet's Profile!</Link></p>
      ) : (
        pets.map((pet) => (
          <div key={pet.id} className="card">
            <Link to={`/pet/${pet.id}`}>
              <img
                src={'https://media.istockphoto.com/id/1324471626/vector/dog-love-simple-logo.jpg?s=612x612&w=0&k=20&c=U7PzRbOpk9MVCVIfT3ONvnFbcOnpzmQM7eIAWGNy1ok='} // Make sure you have an 'image' property in your pet data
                alt={`Image of ${pet.name}`}
                className="card-img-top"
              />
            </Link>

            <div className="card-body">
              <p className="card-text">
                Name: {pet.name}
                <br />
                Birthday: {pet.birthday}
                <br />
                Description: {pet.description}
                <br />
                Species: {pet.species}
              </p>

              <button onClick={() => handleViewPetEvents(pet.id)}>View Pet Events</button>
              <button onClick={() => handleDeletePet(pet.id)}>Delete Pet</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DisplayPets;