package com.cognixia.jump.JunitTest;

import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import com.cognixia.jump.controller.PetController;
import com.cognixia.jump.service.PetService;
import com.cognixia.jump.exception.ResourceNotFoundException;
import com.cognixia.jump.model.Event;
import com.cognixia.jump.model.Pet;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;


class PetControllerTest {

    private PetController petController;
    private PetService petService;

    @BeforeEach
    void setUp() {

    	 petService = mock(PetService.class);
         petController = new PetController(petService);

        petService = mock(PetService.class);
        petController = new PetController(petService);
    }

    void testGetAllPets() {
        // Arrange
        List<Pet> pets = new ArrayList<>();
        when(petService.getAllPets()).thenReturn(pets);

        // Act
        ResponseEntity<List<Pet>> response = petController.getAllPets();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(pets, response.getBody());
    }

   

    @Test
    void testGetEventsByPet() {
        // Arrange
        Long petId = 1L;
        List<Event> events = new ArrayList<>();
        when(petService.getEventsForPet(eq(petId))).thenReturn(events);

        // Act
        ResponseEntity<List<Event>> response = petController.getEventsByPet(petId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(events, response.getBody());
    }

    @Test
    void testCreatePet() {
        // Arrange
        Pet petToCreate = new Pet();
        Pet createdPet = new Pet();
        when(petService.createPet(eq(petToCreate))).thenReturn(createdPet);

        // Act
        ResponseEntity<Pet> response = petController.createPet(petToCreate);

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(createdPet, response.getBody());
    }

    @Test
    void testUpdatePet() {
        // Arrange
        Long petId = 1L;
        Pet petDetails = new Pet();
        Pet existingPet = new Pet();
        
        when(petService.updatePet(any())).thenReturn(existingPet);

        // Act
        ResponseEntity<Pet> response = petController.updatePet(petId, petDetails);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(existingPet, response.getBody());
    }

  

    @Test
    void testDeletePet() {
        // Arrange
        Long petId = 1L;

        // Act
        ResponseEntity<?> response = petController.deletePet(petId);

        // Assert
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }

    @Test
    void testDeletePet_NotFound() {
        // Arrange
        Long petId = 1L;
        when(petService.deletePet(eq(petId))).thenThrow(new ResourceNotFoundException("Pet", "id", petId.toString()));

        // Act and Assert
        assertThrows(ResourceNotFoundException.class, () -> petController.deletePet(petId));
    }

}
