package com.cognixia.jump.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

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
    @Operation(summary = "Get pet by ID", description = "Retrieves details of a pet by their ID")
    public ResponseEntity<Optional<Pet>> getPetById(@PathVariable Long id) {
        Optional<Pet> pet = petService.getPetById(id);
        return ResponseEntity.ok(pet);
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
        return new ResponseEntity<>(petService.createPet(pet), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a pet", description = "Updates the details of an existing pet")
    public ResponseEntity<Pet> updatePet(@PathVariable Long id, @Valid @RequestBody Pet petDetails) {
        Pet pet = petService.getPetById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pet", "id", id.toString()));

        pet.setSpecies(petDetails.getSpecies());
        pet.setPetPicture(petDetails.getPetPicture());
        pet.setBirthdate(petDetails.getBirthdate());
        pet.setTemparement(petDetails.getTemparement());
        pet.setDescription(petDetails.getDescription());
        pet.setOwnerId(petDetails.getOwnerId());

        Pet updatedPet = petService.updatePet(pet);
        return ResponseEntity.ok(updatedPet);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a pet", description = "Deletes a pet from the database by their ID")
    public ResponseEntity<?> deletePet(@PathVariable Long id) {
        petService.deletePet(id);
        return ResponseEntity.noContent().build();
    }
}
