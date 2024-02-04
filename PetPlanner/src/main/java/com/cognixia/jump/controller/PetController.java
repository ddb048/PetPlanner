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
    public ResponseEntity<ApiResponse> getAllPets() {
    	
    	PetService.getAllPetsResult result = petService.getAllPets();
    	
    	switch (result) {
        case SUCCESS:
        	List<Pet> pets = petService.getAllPetsHelper();
            return ResponseEntity.ok(new ApiResponse(true, "All pets have been founded successfully", pets));
        case PET_NOT_FOUND:
            return ResponseEntity.badRequest().body(new ApiResponse(false, "This Pet does not exist"));
        default:
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An unexpected error occurred"));
    	}
    	
    	
        
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getPetById(@PathVariable Long id) {
        
    	PetService.getPetByIdResult result = petService.getPetById(id);
    	
    	switch (result) {
        case SUCCESS:
        	Pet pet = petService.getPetByIdHelper(id);
            return ResponseEntity.ok(new ApiResponse(true, "Pet have been founded successfully", pet));
        case PET_NOT_FOUND:
            return ResponseEntity.badRequest().body(new ApiResponse(false, "This Pet does not exist"));
        default:
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An unexpected error occurred"));
    	}
    }

    @GetMapping("/{petId}/events")
    @Operation(summary = "Get all events by pet", description = "Retrieves all events a specific pet is attending")
    public ResponseEntity<ApiResponse> getEventsByPet(@PathVariable Long petId) {
        
    	PetService.getEventsForPetResult result = petService.getEventsForPet(petId);
    	
    	switch (result) {
        case SUCCESS:
        	List<Event> events = petService.getEventsForPetHelper(petId);
            return ResponseEntity.ok(new ApiResponse(true, "Pet's events have been founded successfully",events ));
        case EVENTS_NOT_FOUND:
            return ResponseEntity.badRequest().body(new ApiResponse(false, "This Pet has no events"));
        case PET_NOT_FOUND:
            return ResponseEntity.badRequest().body(new ApiResponse(false, "This Pet does not exist"));
        default:
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An unexpected error occurred"));
    	}
    	
    	
    	
    	
    }

    @PostMapping
    @Operation(summary = "Create a new pet", description = "Adds a new pet to the database")
    public ResponseEntity<ApiResponse> createPet(@RequestBody Pet pet) {
    	
    	PetService.createPetResult result = petService.createPet(pet);
    	
    	switch (result) {
        case SUCCESS:
            return ResponseEntity.ok(new ApiResponse(true, "Pet has been created successfully"));
        default:
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An unexpected error occurred"));
    	}
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updatePet(@PathVariable Long id, @Valid @RequestBody Pet petDetails) {
    	
    	PetService.UpdatePetResult result = petService.updatePet(petDetails);
    	
    	switch (result) {
        case SUCCESS:
            return ResponseEntity.ok(new ApiResponse(true, "Pet has been updated successfully"));
        case PET_NOT_FOUND:
            return ResponseEntity.badRequest().body(new ApiResponse(false, "This pet does not exist"));
        case USER_NOT_FOUND:
        	return ResponseEntity.badRequest().body(new ApiResponse(false, "This user does not exist"));
        default:
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An unexpected error occurred"));
    	}
    		
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a pet", description = "Deletes a pet from the database by their ID")
    public ResponseEntity<ApiResponse> deletePet(@PathVariable Long id) {
        
    	PetService.DeletePetResult result = petService.deletePet(id);
    	
    	switch (result) {
        case SUCCESS:
            return ResponseEntity.ok(new ApiResponse(true, "Pet has been deleted successfully"));
        case PET_NOT_FOUND:
            return ResponseEntity.badRequest().body(new ApiResponse(false, "This pet does not exist"));
        default:
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An unexpected error occurred"));
    }
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
