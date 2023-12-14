import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CreatePet = () => {
  const [formData, setFormData] = useState({
    name: '',
    birthday: '',
    description: '',
    species: '',
    // Use your own default image URL here
    image: 'https://media.istockphoto.com/id/1324471626/vector/dog-love-simple-logo.jpg?s=612x612&w=0&k=20&c=U7PzRbOpk9MVCVIfT3ONvnFbcOnpzmQM7eIAWGNy1ok=',
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make a POST request to your API endpoint without Authorization
    fetch('http://localhost:8080/api/pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server (data may contain the created pet)
        console.log('Pet created successfully:', data);

        // Reset the form data
        setFormData({
          name: '',
          birthday: '',
          description: '',
          species: '',
          // Use your own default image URL for the next pet
          image: 'https://media.istockphoto.com/id/1324471626/vector/dog-love-simple-logo.jpg?s=612x612&w=0&k=20&c=U7PzRbOpk9MVCVIfT3ONvnFbcOnpzmQM7eIAWGNy1ok=',
        });

        // Use navigate to redirect to the display page with state
        navigate('/display-pets', { state: { newPet: data } });
      })
      .catch((error) => {
        console.error('Error creating pet:', error);
        // Handle errors if necessary
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Let's talk about your Pet! </h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Birthday:
          <input type="text" name="birthday" value={formData.birthday} onChange={handleChange} />
        </label>
        <br />
        <label>
          Description:
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </label>
        <br />
        <label>
          Species:
          <select className="custom-select mr-sm-2" onChange={handleChange} name="species" value={formData.species}>
            <option value="">Choose...</option>
            <option value="1">Dog</option>
            <option value="2">Cat</option>
            <option value="3">Chinchilla</option>
          </select>
        </label>
        <br />

        {/* Display the default image URL, but prevent user input */}
        <label htmlFor="exampleFormControlFile1">
          Image URL:
          <input type="text" name="image" value={formData.image} onChange={handleChange} readOnly />
        </label>
        <br />
        <button type="submit">Create Pet</button>
      </form>
    </div>
  );
};

export default CreatePet;
