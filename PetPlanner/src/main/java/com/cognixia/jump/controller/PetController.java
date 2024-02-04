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
import com.cognixia.jump.util.ApiResponse;

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
    public ResponseEntity<ApiResponse> deletePet(@PathVariable Long id) {
        boolean isDeleted = petService.deletePet(id);
        if (!isDeleted) {

            return ResponseEntity.badRequest().body(new ApiResponse(false, "No pet found with ID: " + id));
        }

        return ResponseEntity.ok(new ApiResponse(true, "Pet successfully deleted."));
    }

    @PostMapping("/{petId}/{eventId}")
    public ResponseEntity<ApiResponse> addPetToEvent(@PathVariable Long petId, @PathVariable Long eventId) {
        PetService.AddPetToEventResult result = petService.addPetToEvent(petId, eventId);

        switch (result) {
            case SUCCESS:
                return ResponseEntity.ok(new ApiResponse(true, "Pet added to event successfully"));
            case PET_ALREADY_ATTENDING:
                return ResponseEntity.badRequest()
                        .body(new ApiResponse(false, "This pet is already attending this event"));
            case PET_NOT_FOUND:
                return ResponseEntity.badRequest().body(new ApiResponse(false, "This pet does not exist"));
            case EVENT_NOT_FOUND:
                return ResponseEntity.badRequest().body(new ApiResponse(false, "This event does not exist"));
            default:
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new ApiResponse(false, "An unexpected error occurred"));
        }
    }

    @DeleteMapping("/{petId}/{eventId}")
    public ResponseEntity<ApiResponse> deletePetFromEvent(@PathVariable Long petId, @PathVariable Long eventId) {
        PetService.DeletePetFromEventResult result = petService.deletePetFromEvent(petId, eventId);

        switch (result) {
            case SUCCESS:
                return ResponseEntity.ok(new ApiResponse(true, "Pet removed from event successfully"));
            case PET_NOT_FOUND:
                return ResponseEntity.badRequest().body(new ApiResponse(false, "This pet does not exist"));
            case EVENT_NOT_FOUND:
                return ResponseEntity.badRequest().body(new ApiResponse(false, "This event does not exist"));
            case PET_NOT_ATTENDING_EVENT:
                return ResponseEntity.badRequest()
                        .body(new ApiResponse(false, "This pet is not attending the specified event"));
            default:
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new ApiResponse(false, "An unexpected error occurred"));
        }
    }
}
