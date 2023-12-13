package com.cognixia.jump.JunitTest;



import org.junit.jupiter.api.Test;


import com.cognixia.jump.service.PetService;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


import org.mockito.InjectMocks;
import org.mockito.Mock;
//import org.springframework.boot.test.context.SpringBootTest;

import com.cognixia.jump.exception.ResourceNotFoundException;
import com.cognixia.jump.model.Event;
import com.cognixia.jump.model.Pet;
import com.cognixia.jump.model.User;
import com.cognixia.jump.repository.EventRepository;
import com.cognixia.jump.repository.PetRepository;

//@SpringBootTest
class PetServiceTest {

    @Mock
    private PetRepository petRepository;

    @Mock
    private EventRepository eventRepository;

    @InjectMocks
    private PetService petService;

    @Test
    void testCreatePet() {
        // Arrange
        Pet petToCreate = new Pet();
        when(petRepository.save(petToCreate)).thenReturn(petToCreate);

        // Act
        Pet createdPet = petService.createPet(petToCreate);

        // Assert
        assertNotNull(createdPet);
        assertEquals(petToCreate, createdPet);
    }

    @Test
    void testGetAllPets() {
        // Arrange
        List<Pet> allPets = new ArrayList<>();
        when(petRepository.findAll()).thenReturn(allPets);

        // Act
        List<Pet> retrievedPets = petService.getAllPets();

        // Assert
        assertNotNull(retrievedPets);
        assertEquals(allPets, retrievedPets);
    }

    @Test
    void testGetPetById() {
        // Arrange
        Long petId = 1L;
        Pet existingPet = new Pet();
        when(petRepository.findById(petId)).thenReturn(Optional.of(existingPet));

        // Act
        Optional<Pet> retrievedPet = petService.getPetById(petId);

        // Assert
        assertTrue(retrievedPet.isPresent());
        assertEquals(existingPet, retrievedPet.get());
    }

    @Test
    void testGetPetByIdNotFound() {
        // Arrange
        Long nonExistingPetId = 99L;
        when(petRepository.findById(nonExistingPetId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> petService.getPetById(nonExistingPetId));
    }

    @Test
    void testGetPetsByOwner() {
        // Arrange
        User owner = new User();
        List<Pet> ownerPets = new ArrayList<>();
        when(petRepository.findByOwner(owner)).thenReturn(ownerPets);

        // Act
        List<Pet> retrievedPets = petService.getPetsByOwner(owner);

        // Assert
        assertNotNull(retrievedPets);
        assertEquals(ownerPets, retrievedPets);
    }

    @Test
    void testGetEventsForPet() {
        // Arrange
        Long petId = 1L;
        Pet pet = new Pet();
        when(petRepository.findById(petId)).thenReturn(Optional.of(pet));

        List<Event> petEvents = new ArrayList<>();
        when(eventRepository.findByPets(pet)).thenReturn(petEvents);

        // Act
        List<Event> retrievedEvents = petService.getEventsForPet(petId);

        // Assert
        assertNotNull(retrievedEvents);
        assertEquals(petEvents, retrievedEvents);
    }

    @Test
    void testUpdatePet() {
        // Arrange
        Pet existingPet = new Pet();
        existingPet.setId(1L);

        Pet updatedPetData = new Pet();
        updatedPetData.setId(1L);
        updatedPetData.setSpecies(Pet.Species.CAT);

        when(petRepository.findById(existingPet.getId())).thenReturn(Optional.of(existingPet));
        when(petRepository.save(updatedPetData)).thenReturn(updatedPetData);

        // Act
        Pet updatedPet = petService.updatePet(updatedPetData);

        // Assert
        assertNotNull(updatedPet);
        assertEquals(updatedPetData.getId(), updatedPet.getId());
        assertEquals(updatedPetData.getSpecies(), updatedPet.getSpecies());
    }

    @Test
    void testUpdatePetNotFound() {
        // Arrange
        Pet nonExistingPet = new Pet();
        nonExistingPet.setId(99L);

        when(petRepository.findById(nonExistingPet.getId())).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> petService.updatePet(nonExistingPet));
    }

    @Test
    void testDeletePet() {
        // Arrange
        Long petIdToDelete = 1L;
        when(petRepository.existsById(petIdToDelete)).thenReturn(true);

        // Act
        boolean deletionResult = petService.deletePet(petIdToDelete);

        // Assert
        assertTrue(deletionResult);
        verify(petRepository, times(1)).deleteById(petIdToDelete);
    }

    @Test
    void testDeletePetNonExisting() {
        // Arrange
        Long nonExistingPetId = 99L;
        when(petRepository.existsById(nonExistingPetId)).thenReturn(false);

        // Act
        boolean deletionResult = petService.deletePet(nonExistingPetId);

        // Assert
        assertFalse(deletionResult);
        verify(petRepository, never()).deleteById(nonExistingPetId);
    }
}
