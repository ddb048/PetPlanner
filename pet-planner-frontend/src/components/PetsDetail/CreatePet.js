import React, { useState } from 'react';

const CreatePet = () => {
  const [formData, setFormData] = useState({
    name: '',
    birthday: '',
    description: '',
    species: '',
    image: null,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make a POST request to your API endpoint
    const userToken = localStorage.getItem('userToken');

    fetch('http://localhost:8080/api/pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`, 
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
          image: '',
        });
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
          <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" onChange={handleChange} name="species">
            <option selected>Choose...</option>
            <option value="1">Dog</option>
            <option value="2">Cat</option>
            <option value="3">Chinchilla</option>
     
          </select>
        </label>
        <br />

        <label htmlFor="exampleFormControlFile1">
          Image URL:
          <input type="text" name="image" value={formData.image} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Create Pet</button>
      </form>
    </div>
  );
};

export default CreatePet;