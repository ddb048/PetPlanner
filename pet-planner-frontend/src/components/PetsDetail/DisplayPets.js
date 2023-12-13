import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DisplayPets = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    // Fetch pets from your API
    fetch('your-api-endpoint/pets')
      .then((response) => response.json())
      .then((data) => setPets(data))
      .catch((error) => console.error('Error fetching pets:', error));
  }, []);

  return (
    <div>
      <h1>Welcome! Here are your PetPals:</h1>

      {pets.map((pet) => (
        <Link key={pet.id} to={`/pet/${pet.id}`}>
          <div className="card">
            <img
              src={pet.image} // Assuming your API provides an image URL
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
      ))}
    </div>
  );
};

export default DisplayPets;