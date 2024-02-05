package com.cognixia.jump.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognixia.jump.exception.ResourceNotFoundException;
import com.cognixia.jump.model.Event;
import com.cognixia.jump.model.Pet;
import com.cognixia.jump.model.User;
import com.cognixia.jump.repository.EventRepository;
import com.cognixia.jump.repository.PetRepository;
import com.cognixia.jump.repository.UserRepository;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;


    public enum AddPetToEventResult {
        SUCCESS,
        PET_ALREADY_ATTENDING,
        PET_NOT_FOUND,
        EVENT_NOT_FOUND
    }

    public enum DeletePetFromEventResult {
        SUCCESS,
        PET_NOT_FOUND,
        EVENT_NOT_FOUND,
        PET_NOT_ATTENDING_EVENT
    }

    public enum DeletePetResult {
        SUCCESS,
        PET_NOT_FOUND
    }

    public enum UpdatePetResult {
    	SUCCESS,
        PET_NOT_FOUND,
        USER_NOT_FOUND

    }

    public enum getEventsForPetResult {
    	SUCCESS,
        PET_NOT_FOUND,
        EVENTS_NOT_FOUND

    }

    public enum getPetsByUserResult {
    	SUCCESS,
        USER_NOT_FOUND,
        PET_NOT_FOUND

    }

    public enum getPetByIdResult {
    	SUCCESS,
        PET_NOT_FOUND

    }

    public enum getAllPetsResult {
    	SUCCESS,
        PET_NOT_FOUND

    }

    public enum createPetResult {
    	SUCCESS
    }




    // CREATE
    public createPetResult createPet(Pet pet) {

        petRepository.save(pet);

        return createPetResult.SUCCESS;
    }

    public List<Pet> getAllPetsHelper() {
        return petRepository.findAll();
    }

    // READ
    public getAllPetsResult getAllPets() {

    	List<Pet> pets = petRepository.findAll();

    	if(pets.isEmpty())
    	{
    		return getAllPetsResult.PET_NOT_FOUND;
    	}


    	return getAllPetsResult.SUCCESS;
    }

    public Pet getPetByIdHelper(Long id) {
        return petRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pet", "id", id.toString()));
    }

    public getPetByIdResult getPetById(Long id) {

    	Optional<Pet> optionalPet = petRepository.findById(id);

    	if(optionalPet.isEmpty())
    	{
    		return getPetByIdResult.PET_NOT_FOUND;
    	}

    	return getPetByIdResult.SUCCESS;
    }

    public List<Pet> getPetsByUserHelper(User user) {
        return petRepository.findByUser(user);
    }

    public getPetsByUserResult getPetsByUser(User user) {

    	Optional<User> optionalUser = userRepository.findById(user.getId());

    	if(optionalUser.isEmpty())
    	{
    		return getPetsByUserResult.USER_NOT_FOUND;
    	}

    	 List<Pet> pets = petRepository.findByUser(user);

    	 if(pets.isEmpty())
    	 {
    		 return getPetsByUserResult.PET_NOT_FOUND;
    	 }

    	 return getPetsByUserResult.SUCCESS;
    }

    public List<Event> getEventsForPetHelper(Long petId) {
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new ResourceNotFoundException("Pet", "id", petId.toString()));
        return eventRepository.findByPets(pet);
    }

    public getEventsForPetResult getEventsForPet(Long petId) {

    	Optional<Pet> pet = petRepository.findById(petId);

    	if(pet.isEmpty())
    	{
    		return getEventsForPetResult.PET_NOT_FOUND;
    	}


    	List<Event> events = eventRepository.findByPets(pet.get());

    	if(events.isEmpty())
    	{
    		return getEventsForPetResult.EVENTS_NOT_FOUND;
    	}

    	return getEventsForPetResult.SUCCESS;
    }



    // UPDATE
    public UpdatePetResult updatePet(Pet pet) {

        if (pet == null || pet.getId() == null) {
            return UpdatePetResult.PET_NOT_FOUND;
        }

        Optional<Pet> optionalPet = petRepository.findById(pet.getId());

        if (optionalPet.isEmpty()) {
            return UpdatePetResult.PET_NOT_FOUND;
        }

        if (pet.getUser() == null || pet.getUser().getId() == null) {
            return UpdatePetResult.USER_NOT_FOUND;
        }

        Optional<User> user = userRepository.findById(pet.getUser().getId());

        if (user.isEmpty()) {
            return UpdatePetResult.USER_NOT_FOUND;
        }

        Pet existingPet = optionalPet.get();
        existingPet.setSpecies(pet.getSpecies());
        existingPet.setPetPicture(pet.getPetPicture());
        existingPet.setBirthdate(pet.getBirthdate());
        existingPet.setTemparement(pet.getTemparement());
        existingPet.setDescription(pet.getDescription());
        existingPet.setPetName(pet.getPetName());

        existingPet.setUser(user.get());

        petRepository.save(existingPet);

        return UpdatePetResult.SUCCESS;
    }


    // DELETE
    @Transactional
    public DeletePetResult deletePet(Long id) {

    	Optional<Pet> optionalPet = petRepository.findById(id);

    	if(optionalPet.isEmpty())
    	{
    		return DeletePetResult.PET_NOT_FOUND;
    	}

    	optionalPet.ifPresent(pet -> {
    	    pet.getEvents().forEach(event -> {
    	        event.getPets().remove(pet);
    	    });
    	    pet.getEvents().clear();

    	    petRepository.delete(pet);
    	});

    		return DeletePetResult.SUCCESS;
    }

    public AddPetToEventResult addPetToEvent(Long petId, Long eventId) {
        Optional<Pet> optionalPet = petRepository.findById(petId);
        if (!optionalPet.isPresent()) {
            return AddPetToEventResult.PET_NOT_FOUND;
        }

        Optional<Event> optionalEvent = eventRepository.findById(eventId);
        if (!optionalEvent.isPresent()) {
            return AddPetToEventResult.EVENT_NOT_FOUND;
        }

        Pet pet = optionalPet.get();
        Event event = optionalEvent.get();

        // Check if the pet is already part of the event
        if (event.getPets().contains(pet)) {
            return AddPetToEventResult.PET_ALREADY_ATTENDING;
        }

        // If not, add the pet to the event and save the changes
        event.getPets().add(pet);
        pet.getEvents().add(event);

        eventRepository.save(event);
        petRepository.save(pet);

        return AddPetToEventResult.SUCCESS;
    }

    public DeletePetFromEventResult deletePetFromEvent(Long petId, Long eventId) {
        Optional<Pet> optionalPet = petRepository.findById(petId);
        if (!optionalPet.isPresent()) {
            return DeletePetFromEventResult.PET_NOT_FOUND;
        }

        Optional<Event> optionalEvent = eventRepository.findById(eventId);
        if (!optionalEvent.isPresent()) {
            return DeletePetFromEventResult.EVENT_NOT_FOUND;
        }

        Pet pet = optionalPet.get();
        Event event = optionalEvent.get();

        if (!event.getPets().contains(pet)) {
            return DeletePetFromEventResult.PET_NOT_ATTENDING_EVENT;
        }

        event.getPets().remove(pet);
        pet.getEvents().remove(event);

        eventRepository.save(event);
        petRepository.save(pet);

        return DeletePetFromEventResult.SUCCESS;
    }
}
