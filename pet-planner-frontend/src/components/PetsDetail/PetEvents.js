//Events 


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PetEvents = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch detailed information about the selected pet
    fetch(`your-api-endpoint/pets/${id}`)
      .then((response) => response.json())
      .then((data) => setPet(data))
      .catch((error) => console.error('Error fetching pet details:', error));

    // Fetch events for the selected pet
    fetch(`your-api-endpoint/pets/${id}/events`)
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching pet events:', error));
  }, [id]);

  if (!pet) {
    return <div>Loading...Meow... Still Looking </div>;
  }

  return (
    <div>
      <h1>{pet.name}'s Details</h1>
      <img src={pet.image} alt={`Image of ${pet.name}`} />

      <div>
        <p>Birthday: {pet.birthday}</p>
        <p>Description: {pet.description}</p>
      </div>

      <h2> Events:  </h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <p>{event.date}: {event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PetEvents;