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

    // CREATE
    public Pet createPet(Pet pet) {

    	System.out.println(pet);

        return petRepository.save(pet);
    }

    // READ
    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    public Pet getPetById(Long id) {
        return petRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pet", "id", id.toString()));
    }

    public List<Pet> getPetsByUser(User user) {
        return petRepository.findByUser(user);
    }

    public List<Event> getEventsForPet(Long petId) {
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new ResourceNotFoundException("Pet", "id", petId.toString()));
        return eventRepository.findByPets(pet);
    }

    // UPDATE
    public Pet updatePet(Pet pet) {
        return petRepository.findById(pet.getId())
                .map(existingPet -> {
                    existingPet.setSpecies(pet.getSpecies());
                    existingPet.setPetPicture(pet.getPetPicture());
                    existingPet.setBirthdate(pet.getBirthdate());
                    existingPet.setTemparement(pet.getTemparement());
                    existingPet.setDescription(pet.getDescription());
                    existingPet.setPetName(pet.getPetName());

                    User user = userRepository.findById(pet.getUser().getId())
                            .orElseThrow(() -> new ResourceNotFoundException("User", "id",
                                    pet.getUser().toString()));
                    existingPet.setUser(user);

                    return petRepository.save(existingPet);
                })
                .orElseThrow(() -> new ResourceNotFoundException("Pet", "id", pet.getId().toString()));
    }

    // DELETE
    @Transactional
    public boolean deletePet(Long id) {
        return petRepository.findById(id)
                .map(pet -> {
                    pet.getEvents().forEach(event -> {
                        event.getPets().remove(pet);
                    });
                    pet.getEvents().clear();

                    petRepository.delete(pet);
                    return true;
                }).orElse(false);
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
