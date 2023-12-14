package com.cognixia.jump.JunitTest;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.junit.jupiter.api.Test;

import com.cognixia.jump.model.Event;
import com.cognixia.jump.model.Pet;
import com.cognixia.jump.model.User;

class PetTest {

    @Test
    void testCreatePet() {
        // Arrange
        Long id = 1L;
        User owner = new User();
        Pet.Species species = Pet.Species.DOG;
        String petPicture = "dog.jpg";
        Date birthdate = new Date();
        Pet.Temperament temperament = Pet.Temperament.FRIENDLY;
        String description = "Friendly dog";
        Set<Event> events = new HashSet<>();

        // Act
        Pet pet = new Pet(id, owner, species, petPicture, birthdate, temperament, description, events);

        // Assert
        assertNotNull(pet);
        assertEquals(id, pet.getId());
        assertEquals(owner, pet.getOwnerId());
        assertEquals(species, pet.getSpecies());
        assertEquals(petPicture, pet.getPetPicture());
        assertEquals(birthdate, pet.getBirthdate());
        assertEquals(temperament, pet.getTemparement());
        assertEquals(description, pet.getDescription());

    }

    @Test
    void testDefaultConstructor() {
        // Act
        Pet pet = new Pet();

        // Assert
        assertNotNull(pet);
        assertNull(pet.getId());
        assertNull(pet.getOwnerId());
        assertNull(pet.getSpecies());
        assertNull(pet.getPetPicture());
        assertNull(pet.getBirthdate());
        assertNull(pet.getTemparement());
        assertNull(pet.getDescription());

    }

    @Test
    void testSettersAndGetters() {
        // Arrange
        Pet pet = new Pet();

        // Act
        Long id = 2L;
        User owner = new User();
        Pet.Species species = Pet.Species.CAT;
        String petPicture = "cat.jpg";
        Date birthdate = new Date();
        Pet.Temperament temperament = Pet.Temperament.CALM;
        String description = "Calm cat";

        pet.setId(id);
        pet.setOwnerId(owner);
        pet.setSpecies(species);
        pet.setPetPicture(petPicture);
        pet.setBirthdate(birthdate);
        pet.setTemparement(temperament);
        pet.setDescription(description);

        // Assert
        assertEquals(id, pet.getId());
        assertEquals(owner, pet.getOwnerId());
        assertEquals(species, pet.getSpecies());
        assertEquals(petPicture, pet.getPetPicture());
        assertEquals(birthdate, pet.getBirthdate());
        assertEquals(temperament, pet.getTemparement());
        assertEquals(description, pet.getDescription());

    }

    @Test
    void testToString() {
        // Arrange
        Long id = 3L;
        User owner = new User();
        Pet.Species species = Pet.Species.BIRD;
        String petPicture = "bird.jpg";
        Date birthdate = new Date();
        Pet.Temperament temperament = Pet.Temperament.PLAYFUL;
        String description = "Playful bird";
        Set<Event> events = new HashSet<>();

        Pet pet = new Pet(id, owner, species, petPicture, birthdate, temperament, description, events);

        // Act
        String petString = pet.toString();

        // Assert
        assertNotNull(petString);
        assertTrue(petString.contains("id=" + id));
        assertTrue(petString.contains("species=" + species));
        assertTrue(petString.contains("petPicture=" + petPicture));
        assertTrue(petString.contains("birthdate=" + birthdate));
        assertTrue(petString.contains("temperament=" + temperament)); // corrected the typo here
        assertTrue(petString.contains("description=" + description));
    }

}
