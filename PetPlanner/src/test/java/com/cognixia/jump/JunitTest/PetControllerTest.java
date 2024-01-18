package com.cognixia.jump.JunitTest;

import com.cognixia.jump.exception.ResourceNotFoundException;
import com.cognixia.jump.model.Event;
import com.cognixia.jump.model.Pet;
import com.cognixia.jump.model.User;
import com.cognixia.jump.service.PetService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import com.cognixia.jump.controller.PetController;

import static org.hamcrest.Matchers.hasSize;
import static org.junit.Assert.assertSame;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PetControllerTest {

    @Mock
    private PetService petService;
    
    @InjectMocks
    private PetController petController;

    @Test
    void getAllPets() throws Exception {
    	// Arrange
        List<Pet> pets = new ArrayList<>();
        when(petService.getAllPets()).thenReturn(pets);

        // Act
        ResponseEntity<List<Pet>> response = petController.getAllPets();

        // Assert
        verify(petService, times(1)).getAllPets();
        assertSame(HttpStatus.OK, response.getStatusCode());
        assertSame(pets, response.getBody());
    }

    @Test
    void getPetById() throws Exception {
        // Arrange
        Long petId = 1L;
        Pet pet = new Pet();
        when(petService.getPetById(petId)).thenReturn(pet);

        // Act & Assert
        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(petController).build();
        mockMvc.perform(MockMvcRequestBuilders.get("/api/pets/{id}", petId))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void getPetByIdNotFound() throws Exception {
        // Arrange
        Long petId = 1L;
        when(petService.getPetById(petId)).thenThrow(new ResourceNotFoundException("Pet", "id", petId.toString()));

        // Act & Assert
        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(petController).build();
        mockMvc.perform(MockMvcRequestBuilders.get("/api/pets/{id}", petId))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    void getEventsByPet() {
        // Arrange
        Long petId = 1L;
        List<Event> events = new ArrayList<>();
        
        when(petService.getEventsForPet(petId)).thenReturn(events);

        // Act
        ResponseEntity<List<Event>> response = petController.getEventsByPet(petId);

        // Assert
        verify(petService, times(1)).getEventsForPet(petId);
        assertSame(HttpStatus.OK, response.getStatusCode());
        assertSame(events, response.getBody());
    }
    
    @Test
    void createPet() throws Exception {
    	// Arrange
        Pet pet = new Pet();
        User user = new User();
        
        user.setId(1L);
        
        pet.setUser(user);
        
        when(petService.createPet(pet)).thenReturn(pet);

        // Act
        ResponseEntity<Pet> response = petController.createPet(pet);

        // Assert
        verify(petService, times(1)).createPet(pet);
        assertSame(HttpStatus.CREATED, response.getStatusCode());
        assertSame(pet, response.getBody());
    }


    
    @Test
    void updatePet() throws Exception {
        // Arrange
        Long petId = 1L;
        Pet existingPet = new Pet();
        existingPet.setId(petId);

        Pet updatedPet = new Pet();
        
        updatedPet.setTemparement(Pet.Temperament.AGGRESSIVE);
        updatedPet.setSpecies(Pet.Species.DOG);

        when(petService.getPetById(petId)).thenReturn(existingPet);
        when(petService.updatePet(any(Pet.class))).thenReturn(updatedPet);

        // Act & Assert
        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(petController).build();
        mockMvc.perform(MockMvcRequestBuilders.put("/api/pets/{id}", petId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(updatedPet)))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void updatePetNotFound() throws Exception {
        // Arrange
        Long petId = 1L;
        Pet updatedPet = new Pet();
        
        updatedPet.setTemparement(Pet.Temperament.AGGRESSIVE);
        updatedPet.setSpecies(Pet.Species.DOG);

        when(petService.getPetById(petId)).thenThrow(new ResourceNotFoundException("Pet", "id", petId.toString()));

        // Act & Assert
        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(petController).build();
        mockMvc.perform(MockMvcRequestBuilders.put("/api/pets/{id}", petId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(updatedPet)))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    void deletePet() throws Exception {
        // Arrange
        Long petId = 1L;

        when(petService.deletePet(petId)).thenReturn(true);

        // Act & Assert
        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(petController).build();
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/pets/{id}", petId))
                .andExpect(MockMvcResultMatchers.status().isNoContent());
    }

    @Test
    void deletePetNotFound() throws Exception {
        // Arrange
        Long petId = 1L;

        when(petService.deletePet(petId)).thenReturn(false);

        // Act & Assert
        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(petController).build();
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/pets/{id}", petId))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }
}