package com.cognixia.jump.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognixia.jump.exception.ResourceNotFoundException;
import com.cognixia.jump.model.Event;
import com.cognixia.jump.model.Pet;
import com.cognixia.jump.service.PetService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/pets")
public class PetController {

    @Autowired
    private final PetService petService;

    public PetController(PetService petService) {
        this.petService = petService;
    };

    @GetMapping
    @Operation(summary = "Get all pets", description = "Retrieves a list of all pets")
    public ResponseEntity<List<Pet>> getAllPets() {
        return ResponseEntity.ok(petService.getAllPets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pet> getPetById(@PathVariable Long id) {
        try {
            Pet pet = petService.getPetById(id); // Directly get Pet object
            return ResponseEntity.ok(pet);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/{petId}/events")
    @Operation(summary = "Get all events by pet", description = "Retrieves all events a specific pet is attending")
    public ResponseEntity<List<Event>> getEventsByPet(@PathVariable Long petId) {
        List<Event> events = petService.getEventsForPet(petId);
        return ResponseEntity.ok(events);
    }

    @PostMapping
    @Operation(summary = "Create a new pet", description = "Adds a new pet to the database")
    public ResponseEntity<Pet> createPet(@RequestBody Pet pet) {

    	System.out.println(pet.getUser());

    	return new ResponseEntity<>(petService.createPet(pet), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pet> updatePet(@PathVariable Long id, @Valid @RequestBody Pet petDetails) {
        try {
            Pet pet = petService.getPetById(id); // Directly get Pet object

            pet.setPetName(petDetails.getPetName());
            pet.setSpecies(petDetails.getSpecies());
            pet.setBirthdate(petDetails.getBirthdate());
            pet.setDescription(petDetails.getDescription());
            pet.setPetPicture(petDetails.getPetPicture());
            pet.setTemparement(petDetails.getTemparement());

            Pet updatedPet = petService.updatePet(pet);
            return ResponseEntity.ok(updatedPet);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a pet", description = "Deletes a pet from the database by their ID")
    public ResponseEntity<?> deletePet(@PathVariable Long id) {
        boolean isDeleted = petService.deletePet(id);
        if (!isDeleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{petId}/{eventId}")
    public ResponseEntity<String> addPetToEvent(@PathVariable Long petId, @PathVariable Long eventId) {
        petService.addPetToEvent(petId, eventId);
        return ResponseEntity.ok("Pet added to event successfully");
    }

    @DeleteMapping("/{petId}/{eventId}")
    public ResponseEntity<String> deletePetFromEvent(@PathVariable Long petId, @PathVariable Long eventId) {
        petService.deletePetFromEvent(petId, eventId);
        return ResponseEntity.ok("Pet removed from event successfully");
    }
}
