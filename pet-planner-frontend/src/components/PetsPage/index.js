import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import PetCards from '../PetCards';
import './index.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const PetsPage = ({ pets }) => {

  const navigate = useNavigate();
  const user = useSelector(state => state.session.user);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  const targetPets = Object.values(pets);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  // // Pet Card Related
  const petList = Object.values(pets);

  // Pets Display Logic
  let petDisplay;
  if (petList.length > 0) {
    petDisplay = petList.map(pet => (
      <PetCards key={pet.id + pet.petName} pet={pet} />
    ));
  } else {
    petDisplay = (
      <div className='no-pets__container'>
        <div className='no-pets__text'>
          No pets found.
        </div>
      </div>
    );
  }

  return (
    <div className='Pets_Page_main'>
      <div className='userpage__pets-header'>
      🐾 Your Pets  🐾
      </div>
      <Link className='userpage__add-pet-link'
        to='/pets/new'>
        Add a Pet
        </Link>

      
      

      <Slider {...settings}>
      {targetPets.map(pet => <PetCards key={pet.id} pet={pet} />)}
    </Slider>
      
    
        
    </div>
  )
};

export default PetsPage;
