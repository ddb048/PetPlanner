package com.cognixia.jump.JunitTest;
import com.cognixia.jump.model.Event;
import com.cognixia.jump.model.User;
import com.cognixia.jump.model.Pet;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.junit.jupiter.api.Test;

class EventTest {

    @Test
    void testCreateEvent() {
        // Arrange
        Long id = 1L;
        Date date = new Date();
        Date duration = new Date();
        String address = "123 Main St";
        User organizer = new User();
        String description = "Test event";
        Set<Pet> pets = new HashSet<>();

        // Act
        Event event = new Event(id, date, duration, address, organizer, description, pets);

        // Assert
        assertNotNull(event);
        assertEquals(id, event.getId());
        assertEquals(date, event.getDate());
        assertEquals(duration, event.getDuration());
        assertEquals(address, event.getAddress());
        assertEquals(organizer, event.getOrganizer());
        assertEquals(description, event.getDescription());
        assertEquals(pets, event.getPets());
    }

    @Test
    void testDefaultConstructor() {
        // Act
        Event event = new Event();

        // Assert
        assertNotNull(event);
        assertNull(event.getId());
        assertNull(event.getDate());
        assertNull(event.getDuration());
        assertNull(event.getAddress());
        assertNull(event.getOrganizer());
        assertNull(event.getDescription());
        assertNotNull(event.getPets());
    }

    @Test
    void testGettersAndSetters() {
        // Arrange
        Event event = new Event();
        Long id = 1L;
        Date date = new Date();
        Date duration = new Date();
        String address = "123 Main St";
        User organizer = new User();
        String description = "Test event";
        Set<Pet> pets = new HashSet<>();

        // Act
        event.setId(id);
        event.setDate(date);
        event.setDuration(duration);
        event.setAddress(address);
        event.setOrganizer(organizer);
        event.setDescription(description);
        event.setPets(pets);

        // Assert
        assertEquals(id, event.getId());
        assertEquals(date, event.getDate());
        assertEquals(duration, event.getDuration());
        assertEquals(address, event.getAddress());
        assertEquals(organizer, event.getOrganizer());
        assertEquals(description, event.getDescription());
        assertEquals(pets, event.getPets());
    }}
    
   
