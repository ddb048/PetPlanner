import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePet, getOnePet } from '../../store/pets'; // Assuming you have an updatePet action
import { useParams } from 'react-router-dom'; // Import useParams from React Router
import './index.css';


  

const UpdatePetModal = ({ onClose }) => {
  
    const [currentPet, setCurrentPet] = useState(null);
    const dispatch = useDispatch();
    const { petId } = useParams(); // Use React Router's useParams to get the petId from the URL
    //const navigate = useNavigate();
    

  // State for updated pet information
  const [name, setName] = useState(currentPet?.pet_name || '');
  const [birthdate, setBirthdate] = useState(currentPet?.birthdate || '');
  const [description, setDescription] = useState(currentPet?.description || '');
  const [species, setSpecies] = useState(currentPet?.species || '');
  const [temparement, setTemparement] = useState(currentPet?.temparement || '');
  const [image, setImage] = useState(currentPet?.pet_picture || '');
  const [backendErrors, setBackendErrors] = useState('');


  //field error states
  const [nameError, setNameError] = useState('');
  const [birthdateError, setBirthdateError] = useState(new Date());
  const [descriptionError, setDescriptionError] = useState('');
  const [speciesError, setSpeciesError] = useState('');
  const [temparementError, setTemparementError] = useState('');
  const [imageError, setImageError] = useState(false);
  const [renderErr, setRenderErr] = useState(false);

  const user = useSelector(state => state.session.user);

 
  /**************************FUNCTIONS************************** */
  const urlValidation = str => {
    return /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/.test(str);
  }

  useEffect(() => {

    

    const fetchData = async () => {
      try {
        const response = await dispatch(getOnePet(petId));
    
        if (response.ok) {
          if (!response.bodyUsed) {
            const petData = await response.json();
            setCurrentPet(petData);
    
            // Set form fields based on pet details
            setName(petData.pet_name || '');
            setBirthdate(petData.birthdate || '');
            // ... (similarly for other fields)
          }
        } else {
          console.error('Failed to fetch pet details');
        }
      } catch (error) {
        console.error('Error fetching pet details:', error);
      }
    };

    const handleErrors = () => {
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
  
      // Rest of your error handling logic...

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
    };
  
    // Call the async function immediately
    fetchData();
  
    // Handle errors after fetching data
    handleErrors();
  
  }, [dispatch, petId, name, birthdate, description, species, temparement, image, currentPet]);


 

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
      const updatedPetInfo = {
        pet_name: name,
        birthdate,
        description,
        species,
        temparement,
        pet_picture: image,
        user_id: user.id,
      };
  
      // Assuming you have an updatePet action
      dispatch(updatePet(currentPet.id, updatedPetInfo))
        .then(() => {
          console.log('Pet updated successfully');
          onClose(); // Close the modal or perform additional actions
        })
        .catch((error) => {
          console.error('Error updating pet:', error);
          // Handle error scenarios if needed
        });
    }

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
                {!!renderErr && nameError.length > 0 && nameError}
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
                {!!renderErr && birthdateError.length > 0 && birthdateError}
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
                {!!renderErr && descriptionError.length > 0 && descriptionError}
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
                {!!renderErr && speciesError.length > 0 && speciesError}
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
                {!!renderErr && temparementError.length > 0 && temparementError}
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
                disabled={backendErrors.length}
              >Update Pet</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  };
export default UpdatePetModal;