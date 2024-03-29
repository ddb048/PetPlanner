import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPet } from '../../store/pets';
// import { restoreUser } from '../../store/session';
import './index.css';

const CreatePet = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  //Logged in user check
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  /**************************STATE************************** */

  //const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [description, setDescription] = useState('');
  const [species, setSpecies] = useState('');
  const [temparement, setTemparement] = useState('');
  const [image, setImage] = useState('');
  const [backendErrors, setBackendErrors] = useState('');

  //field error states
  const [nameError, setNameError] = useState('');
  const [birthdateError, setBirthdateError] = useState(new Date());
  const [descriptionError, setDescriptionError] = useState('');
  const [speciesError, setSpeciesError] = useState('');
  const [temparementError, setTemparementError] = useState('');
  const [imageError, setImageError] = useState(false);
  const [renderErr, setRenderErr] = useState(false);

  /**************************FUNCTIONS************************** */

  const urlValidation = str => {
    return /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/.test(str);
  }

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    const formattedDate = date.toISOString().split('T')[0]; // Formats the date as "yyyy-MM-dd"
    setBirthdate(formattedDate);
  };

  //***********************USE EFFECT******************* */

  useEffect(() => {

    //name error handling
    if (!name.length) {
      setNameError('Please enter a name for your pet');
    } else if (name.length > 50) {
      setNameError('Name must be 50 characters or less');
    } else {
      setNameError('');
    }

    //birthdate error handling
    if (!birthdate.length) {
      setBirthdateError('Please enter your pets birthdate');
    } else if (birthdate - new Date() > 0) {
      setBirthdateError('Birthdate must be in the past');
    } else {
      setBirthdateError('');
    }

    //description error handling
    if (!description.length) {
      setDescriptionError('Please enter a description for your pet');
    } else if (description.length > 500) {
      setDescriptionError('Description must be 500 characters or less');
    } else {
      setDescriptionError('');
    }

    //species error handling
    if (!species.length) {
      setSpeciesError('Please select a species for your pet');
    } else {
      setSpeciesError('');
    }

    //temparement error handling
    if (!temparement.length) {
      setTemparementError('Please select a temparement for your pet');
    } else {
      setTemparementError('');
    }

    //image error handling
    if (!image.length) {
      setImageError('Please enter an image URL for your pet');
    } else if (!urlValidation(image)) {
      setImageError('please enter a valid image URL');
    } else {
      setImageError('');
    }

    setBackendErrors('');

  }, [dispatch, name, birthdate, description, species, temparement, image]);


  //************************On Submit*********************** */

  const handleSubmit = async (event) => {
    event.preventDefault();
    setRenderErr(true);

    if (

      !nameError &&
      !birthdateError &&
      !descriptionError &&
      !speciesError &&
      !temparementError &&
      !imageError
    ) {

      const pet = {
        petName: name,
        birthdate,
        description,
        species,
        temparement,
        petPicture: image,
        user: {id: user.id},
      };

      console.log(pet, 'pet')

      dispatch(createPet(pet))
        .then((pet) => {
          navigate('/pets');
        });
    }
  };

  const onClose = () => {
    navigate('/UserPage');
};


  //*************************Render************************* */

  return (
    <div className='modal-backdrop'>
      <div className="create-event-modal">
        <div className='modal-content'>
          <div className='modal-title'>🐾🌈 Let's talk about your Pet! 🐾🌈 </div>
          <div className='modal-main'>
            <div className='errors__container'>{backendErrors}</div>

            <form className='create-event-form'>
              <div className='create_pet_form_div'>
              😊 Name:
                <input
                  className='modal-input'
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              




              <div className='errors__container'>
                {!!renderErr && nameError.length > 0 && nameError}
              </div>
              <div className='create_pet_form_div'>
              🎉 Birthday:
                <input
                  className='modal-input'
                  type="date"
                  name="birthday"
                  value={birthdate}
                  onChange={handleDateChange}
                />
              </div>
              <div className='errors__container'>
                {!!renderErr && birthdateError.length > 0 && birthdateError}
              </div >

              <div className='create_pet_form_div'>
              📝 Description:
                <input
                  className='modal-input'
                  type="text"
                  name="description"
                  max="500"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className='errors__container'>
                {!!renderErr && descriptionError.length > 0 && descriptionError}
              </div>

              <div className='create_pet_form_div'>
              🐢 Species:
                <select
                  className="custom-select mr-sm-2"
                  name="species"
                  onChange={(e) => setSpecies(e.target.value)}
                  value={species}>
                  <option value="">Select Pet Species</option>
                  <option value="0">DOG</option>
                  <option value="1">CAT</option>
                  <option value="2">BIRD</option>
                  <option value="3">REPTILE</option>
                  <option value="4">FISH</option>
                  <option value="5">OTHER</option>
                </select>
              </div>
              <div className='errors__container'>
                {!!renderErr && speciesError.length > 0 && speciesError}
              </div>

              <div className='create_pet_form_div'>
              🤔 Temparement:
                <select
                  className="custom-select mr-sm-2"
                  onChange={(e) => setTemparement(e.target.value)}
                  name="temparement"
                  value={temparement}>
                  <option value="">Hows your pets temparement?</option>
                  <option value="0">FRIENDLY</option>
                  <option value="1">RESERVED</option>
                  <option value="2">AGGRESSIVE</option>
                  <option value="3">PLAYFUL</option>
                  <option value="4">CALM</option>
                </select>
              </div>
              <div className='errors__container'>
                {!!renderErr && temparementError.length > 0 && temparementError}
              </div>


              {/* Display the default image URL, but prevent user input */}
              <div className='create_pet_form_div'>
              🖼️ Image URL:
                <input
                  className='modal-input'
                  type="text"
                  name="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  />
              </div>

              <div className='errors__container'>
                {!!renderErr && imageError.length > 0 && imageError}
              </div>
              <button
                className="modal-button_petcreate"
                type="submit"
                disabled={backendErrors.length}
                onClick={handleSubmit}
              >Create Pet</button>
              <button className="modal-button_petcreate" type="button" onClick={onClose}>Close</button>
            </form>
            <div className="tips-for-a-great-event">
                            <h3 className="tips-event-title">Spill the fluff! 🐾  </h3>
                            <p className="tip-small-titles">
                            🥳 When is your furry friend's birthday? Choose a date that holds a special meaning for both of you!
                            </p>
                            <p className="tip-small-under">
                            🐾✨Describe your furry friend's personality, appearance, and anything that makes them stand out. We're all ears and paws! 
                            </p>
                            <p className="tip-small-under">
                            🐢Tell us about your fur baby! 🐾 What species are they, and how would you describe their temperament? 🐶😺? Share the pet love! 🐕🐱✨ 
                            </p>
                            <p className="tip-small-titles">
                            🖼️ We need a portrait for the Pet Hall of Fame- drop that adorable image URL! 🐾✨
                            </p>
                        </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default CreatePet;
