import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getOnePet, updatePet } from '../../store/pets';
import './index.css';



const UpdatePetModal = () => {

  //Data-related
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { petId } = useParams();

  useEffect(() => {
    dispatch(getOnePet(petId));
  }, [dispatch, petId]);

  const pet = useSelector(state => state.pets.OnePet);
  const user = useSelector(state => state.session.user);

  // State for updated pet information
  const [name, setName] = useState(pet ? pet.petName : '');
  const [birthdate, setBirthdate] = useState(pet ? pet.birthdate : '');
  const [description, setDescription] = useState(pet ? pet.description : '');
  const [species, setSpecies] = useState(pet ? pet.species : '');
  const [temparement, setTemparement] = useState(pet ? pet.temparement : '');
  const [image, setImage] = useState(pet ? pet.petPicture : '');
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
        setBirthdateError('Please enter your pet\'s birthdate');
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
        setImageError('Images must be formatted as .png, .jpg, .jpeg, or .gif');
      } else {
        setImageError('');
      }

      // Clear backend errors
      setBackendErrors('');



  }, [dispatch, name, birthdate, description, species, temparement, image]);




  const handleUpdate = async (event) => {

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
      const updatedPet = {
        id: pet.id,
        petName: name,
        birthdate,
        description,
        species,
        temparement,
        petPicture: image,
        userId: user.id,
      };

      // Assuming you have an updatePet action
      dispatch(updatePet(updatedPet))
        .then(() => {
          console.log('Pet updated successfully');
          navigate(`/pets/${pet.id}`);
        })
        .catch((error) => {
          console.error('Error updating pet:', error);
          // Handle error scenarios if needed
        });
    }

  };

  const onClose = () => {
    navigate('/UserPage');
};


  return (
    <div className='modal-backdrop'>
      <div className="create-event-modal">
        <div className='modal-content'>
          <div className='modal-title'>Update Your Pet Information</div>
          <div className='modal-main'>
            <div className='errors__container'>{backendErrors}</div>

            <form className='create-event-form' onSubmit={handleUpdate}>
              <div className='create_pet_form_div'>
                Name:
                <input
                  className='modal-input'
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='errors__container'>
                {!!renderErr && nameError?.length > 0 && nameError}
              </div>
              <div className='create_pet_form_div'>
                Birthday:
                <input
                  className='modal-input'
                  type="text"
                  name="birthday"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </div>
              <div className='errors__container'>
                {!!renderErr && birthdateError?.length > 0 && birthdateError}
              </div>

              <div className='create_pet_form_div'>
                Description:
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
                {!!renderErr && descriptionError?.length > 0 && descriptionError}
              </div>

              <div className='create_pet_form_div'>
                Species:
                <select
                  className="custom-select mr-sm-2"
                  name="species"
                  onChange={(e) => setSpecies(e.target.value)}
                  value={species}
                >
                  <option value="">Select Pet Species</option>
                  <option value="1">DOG</option>
                  <option value="2">CAT</option>
                  <option value="3">BIRD</option>
                  <option value="3">REPTILE</option>
                  <option value="3">FISH</option>
                  <option value="3">OTHER</option>
                </select>
              </div>
              <div className='errors__container'>
                {!!renderErr && speciesError?.length > 0 && speciesError}
              </div>

              <div className='create_pet_form_div'>
                temparement:
                <select
                  className="custom-select mr-sm-2"
                  onChange={(e) => setTemparement(e.target.value)}
                  name="temparement"
                  value={temparement}
                >
                  <option value="">Hows your pets temparement?</option>
                  <option value="1">FRIENDLY</option>
                  <option value="2">RESERVED</option>
                  <option value="3">AGGRESSIVE</option>
                  <option value="4">PLAYFUL</option>
                  <option value="5">CALM</option>
                </select>
              </div>
              <div className='errors__container'>
                {!!renderErr && temparementError?.length > 0 && temparementError}
              </div>

              {/* Display the default image URL, but prevent user input */}
              <div className='create_pet_form_div'>
                Image URL:
                <input
                  className='modal-input'
                  type="text"
                  name="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  readOnly
                />
              </div>
              <br />
              <button
                className="modal-button"
                type="submit"
                disabled={backendErrors?.length}
              >Update Pet</button>
              <button className="modal-button" type="button" onClick={onClose}>Close</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  };
export default UpdatePetModal;
