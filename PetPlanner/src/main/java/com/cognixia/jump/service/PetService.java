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

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private EventRepository eventRepository;

    // CREATE
    public Pet createPet(Pet pet) {
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

    public List<Pet> getPetsByOwner(User owner) {
        return petRepository.findByOwner(owner);
    }

    public List<Event> getEventsForPet(Long petId) {
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new ResourceNotFoundException("Pet", "id", petId.toString()));
        return eventRepository.findByPets(pet); // Use the injected EventRepository instance
    }

    // UPDATE
    public Pet updatePet(Pet pet) {
        // Check if the pet exists before updating
        return petRepository.findById(pet.getId())
                .map(existingPet -> petRepository.save(pet))
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
}
