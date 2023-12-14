import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PetEvents = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    date: '',
    description: '',
  });

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

  const handleNewEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();

    // Send a request to your API to create a new event
    fetch(`your-api-endpoint/pets/${id}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the events state with the new event
        setEvents((prevEvents) => [...prevEvents, data]);

        // Clear the form fields
        setNewEvent({
          date: '',
          description: '',
        });
      })
      .catch((error) => console.error('Error creating event:', error));
  };

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


      <h2> Events: </h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <p>{event.date}: {event.description}</p>
          </li>
        ))}
      </ul>

      <h2>Create a New Event:</h2>
      <form onSubmit={handleCreateEvent}>
        <label>
          Date:
          <input
            type="text"
            name="date"
            value={newEvent.date}
            onChange={handleNewEventChange}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={newEvent.description}
            onChange={handleNewEventChange}
          />
        </label>
        <br />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default PetEvents;