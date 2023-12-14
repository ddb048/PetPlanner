import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DisplayPets = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    // Fetch pets from your API
    fetch('http://localhost:8080//api/pets')
      .then((response) => response.json())
      .then((data) => setPets(data))
      .catch((error) => console.error('Error fetching pets:', error));
  }, []);

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
                src={'image of pet link path insert here'}
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

              <button onClick={() => handleDeletePet(pet.id)}>Delete Pet</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DisplayPets;