package com.cognixia.jump.JunitTest;

import com.cognixia.jump.exception.ResourceNotFoundException;
import com.cognixia.jump.model.Event;
import com.cognixia.jump.model.Pet;
import com.cognixia.jump.model.User;
import com.cognixia.jump.repository.EventRepository;
import com.cognixia.jump.repository.PetRepository;
import com.cognixia.jump.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import com.cognixia.jump.service.PetService;
@ExtendWith(MockitoExtension.class)
class PetServiceTest {

    @Mock
    private PetRepository petRepository;

    @Mock
    private EventRepository eventRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private PetService petService;

    @Test
    void createPet() {
        // Arrange
        Pet pet = new Pet();

        when(petRepository.save(pet)).thenReturn(pet);

        // Act
        Pet createdPet = petService.createPet(pet);

        // Assert
        assertNotNull(createdPet);
        verify(petRepository, times(1)).save(pet);
    }

    @Test
    void getAllPets() {
        // Arrange
        Pet pet1 = new Pet();
        Pet pet2 = new Pet();
        List<Pet> pets = Arrays.asList(pet1, pet2);

        when(petRepository.findAll()).thenReturn(pets);

        // Act
        List<Pet> allPets = petService.getAllPets();

        // Assert
        assertEquals(2, allPets.size());
        verify(petRepository, times(1)).findAll();
    }

    @Test
    void getPetById() {
        // Arrange
        Long petId = 1L;
        Pet pet = new Pet();

        when(petRepository.findById(petId)).thenReturn(Optional.of(pet));

        // Act
        Pet foundPet = petService.getPetById(petId);

        // Assert
        assertNotNull(foundPet);
        verify(petRepository, times(1)).findById(petId);
    }

    @Test
    void getPetByIdNotFound() {
        // Arrange
        Long petId = 1L;

        when(petRepository.findById(petId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> petService.getPetById(petId));
        verify(petRepository, times(1)).findById(petId);
    }

    @Test
    void getPetsByOwner() {
        // Arrange
        User owner = new User();
        Pet pet1 = new Pet();
        Pet pet2 = new Pet();
        List<Pet> pets = Arrays.asList(pet1, pet2);

        when(petRepository.findByOwner(owner)).thenReturn(pets);

        // Act
        List<Pet> petsByOwner = petService.getPetsByOwner(owner);

        // Assert
        assertEquals(2, petsByOwner.size());
        verify(petRepository, times(1)).findByOwner(owner);
    }

    // Add similar tests for getEventsForPet, updatePet, and deletePet methods

    @Test
    void deletePet() {
        // Arrange
        Long petId = 1L;

        when(petRepository.existsById(petId)).thenReturn(true);

        // Act
        boolean isDeleted = petService.deletePet(petId);

        // Assert
        assertTrue(isDeleted);
        verify(petRepository, times(1)).existsById(petId);
        verify(petRepository, times(1)).deleteById(petId);
    }

    @Test
    void deletePetNotFound() {
        // Arrange
        Long petId = 1L;

        when(petRepository.existsById(petId)).thenReturn(false);

        // Act
        boolean isDeleted = petService.deletePet(petId);

        // Assert
        assertFalse(isDeleted);
        verify(petRepository, times(1)).existsById(petId);
        verify(petRepository, times(0)).deleteById(petId);
    }
}
