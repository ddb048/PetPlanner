import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventsList from '../EventsList';
import './index.css';

const PetDetailsPage = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [events, setEvents] = useState([])
  const [newEvent, setNewEvent] = useState({
    date: '',
    description: '',
  });

  const [showCreateEventModal, setShowCreateEventModal] = useState(false);

  const handleShowCreateEventModal = () => setShowCreateEventModal(true);
  const handleCloseModal = () => setShowCreateEventModal(false);


  useEffect(() => {
    // Fetch detailed information about the selected pet
    fetch(`http://localhost:8080/api/pets/${id}`)
      .then((response) => response.json())
      .then((data) => setPet(data))
      .catch((error) => console.error('Error fetching pet details:', error));

    // Fetch events for the selected pet
    fetch(`http://localhost:8080/api/pets/${id}/events`)
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
    fetch(`http://localhost:8080/api/pets/${id}/events`, {
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

  const handleDeleteEvent = (eventId) => {
    // Send a request to your API to delete the event
    fetch(`http://localhost:8080/api/pets/${id}/events/${eventId}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Remove the deleted event from the state
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
      })
      .catch((error) => console.error('Error deleting event:', error));
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

      <EventsList
        events={events}
        onCreateEvent={handleCreateEvent}
        onDeleteEvent={handleDeleteEvent}
        showCreateEventModal={showCreateEventModal}
        handleShowCreateEventModal={handleShowCreateEventModal}
        handleCloseModal={handleCloseModal}
      />

    </div>
  );
};

export default PetDetailsPage;
