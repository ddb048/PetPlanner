import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DisplayPets = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    // Fetch pets from your API
    fetch('http://localhost:8080/pet_planner/api/pets')
      .then((response) => response.json())
      .then((data) => setPets(data))
      .catch((error) => console.error('Error fetching pets:', error));
  }, []);

  return (
    <div>
      <h1>Welcome!!! Here are your PetPals!!!</h1>
      <h2>Click on your pet to see What events they have: </h2>

      {pets.length === 0 ? (
        <p> Your PetPlanner is empty . <Link to="/create-pet"> Let's Create You're Pet's Profile !</Link></p>
      ) : (
        pets.map((pet) => (
          <Link key={pet.id} to={`/pet/${pet.id}`}>
            <div className="card">
              <img
                src={'/Users/wendynavarro/Desktop/project2/pet-planner-frontend/src/assets/PetPlannerLogo.png'}
                alt={`Image of ${pet.name}`}
                className="card-img-top"
              />

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
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default DisplayPets;