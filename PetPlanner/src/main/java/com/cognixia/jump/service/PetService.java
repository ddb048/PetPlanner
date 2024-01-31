package com.cognixia.jump.service;

import java.util.List;

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
    public boolean deletePet(Long id) {
        if (petRepository.existsById(id)) {
            petRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public void addPetToEvent(Long petId, Long eventId) {
        Pet pet = petRepository.findById(petId).orElse(null);
        Event event = eventRepository.findById(eventId).orElse(null);

        if (pet != null && event != null) {
            event.getPets().add(pet);
            pet.getEvents().add(event);

            eventRepository.save(event);
            petRepository.save(pet);
        }
    }

    public void deletePetFromEvent(Long petId, Long eventId) {
        Pet pet = petRepository.findById(petId).orElse(null);
        Event event = eventRepository.findById(eventId).orElse(null);

        if (pet != null && event != null) {
            event.getPets().remove(pet);
            pet.getEvents().remove(event);

            eventRepository.save(event);
            petRepository.save(pet);
        }
    }
}
