package com.cognixia.jump.JunitTest;

import com.cognixia.jump.exception.ResourceNotFoundException;
import com.cognixia.jump.model.Event;
import com.cognixia.jump.model.Pet;
import com.cognixia.jump.model.User;
import com.cognixia.jump.repository.UserRepository;
import com.cognixia.jump.service.PetService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;
import java.util.Optional; 
import com.cognixia.jump.controller.PetController;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PetControllerTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PetService petService;

    @InjectMocks
    private PetController petController;

    @Test
    void getAllPets() throws Exception {
        // Arrange
        Pet pet1 = new Pet();
        Pet pet2 = new Pet();
        List<Pet> pets = Arrays.asList(pet1, pet2);

        when(petService.getAllPets()).thenReturn(pets);

        // Act & Assert
        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(petController).build();
        mockMvc.perform(MockMvcRequestBuilders.get("/api/pets"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(2)));
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
    void getEventsByPet() throws Exception {
        // Arrange
        Long petId = 1L;
        Event event1 = new Event();
        Event event2 = new Event();
        List<Event> events = Arrays.asList(event1, event2);

        when(petService.getEventsForPet(petId)).thenReturn(events);

        // Act & Assert
        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(petController).build();
        mockMvc.perform(MockMvcRequestBuilders.get("/api/pets/{petId}/events", petId))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(2)));
    }
    @Test
    void createPet() throws Exception {
        // Arrange
        User owner = new User();
        owner.setId(1L);

        Pet pet = new Pet();
        pet.setSpecies(Pet.Species.DOG); // Use the appropriate enum constant

        // Ensure the owner is set
        pet.setOwner(owner);

        when(userRepository.findById(owner.getId())).thenReturn(Optional.ofNullable(owner));
        when(petService.createPet(any(Pet.class))).thenAnswer(invocation -> {
            Pet createdPet = invocation.getArgument(0);
            // Simulate the behavior of creating a new pet and setting an ID
            createdPet.setId(1L);
            return createdPet;
        });

        // Act & Assert
        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(petController).build();
        mockMvc.perform(MockMvcRequestBuilders.post("/api/pets")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(pet)))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").exists()); // Ensure the response has an ID
    }


    
    @Test
    void updatePet() throws Exception {
        // Arrange
        Long petId = 1L;
        Pet existingPet = new Pet();
        existingPet.setId(petId);

        Pet updatedPet = new Pet();

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