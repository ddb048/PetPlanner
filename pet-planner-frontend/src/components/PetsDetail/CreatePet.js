import React from 'react';


const CreatePet = () => {
    const [formData, setFormData] = useState({
        name: '',
        birthday: '',
        description: '',
        species: '',
        image: '',
      });


    return (
        <div>
            <h1>Let's talk about your Cute Pet! </h1>
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
          <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
        <option selected>Choose...</option>
        <option value="1">Dog</option>
        <option value="2">Cat</option>
        <option value="3">Chinchilla</option>
        <option value="4">Fish</option>
      </select>
        </label>
        <br />
       
        <label for="exampleFormControlFile1">
        <br />
          Image URL:
       
            

        </label>
        <br />
        <button type="submit">Create Pet</button>
      </form>
        </div>
        );
};

export default CreatePet;