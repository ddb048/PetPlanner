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
    void testEventConstructorAndGetters() {
        // Arrange
        Long eventId = 1L;
        Date date = new Date();
        String eventName= "Dog Park Walk";
        String eventPictureUrl="eventdog.jpg";
        Integer duration = 2;
        String address = "123 Park Ave";
        User organizer = new User();
        String description = "Dog meet-up in the park";
       
        // Create a set of pets for testing
        Set<Pet> pets = new HashSet<>();
        Pet pet1 = new Pet();
        Pet pet2 = new Pet();
        pets.add(pet1);
        pets.add(pet2);

        // Act
        Event event = new Event(eventId, date,eventName,eventPictureUrl, duration, address, organizer, description, pets);

        // Assert
        assertNotNull(event);
        assertEquals(eventId, event.getId());
        assertEquals(date, event.getDate());
        assertEquals(eventName, event.getEventName());
        assertEquals(eventPictureUrl, event.getEventPictureUrl());
        assertEquals(duration, event.getDuration());
        assertEquals(address, event.getAddress());
        assertEquals(organizer, event.getUser());
        assertEquals(description, event.getDescription());
        assertEquals(pets, event.getPets());
    }

    @Test
    void testEventDefaultConstructor() {
        // Act
        Event event = new Event();

        // Assert
        assertNotNull(event);
        assertNull(event.getId());
        assertNull(event.getDate());
        assertNull(event.getEventName());
        assertNull(event.getEventName());
        assertNull(event.getDuration());
        assertNull(event.getAddress());
        assertNull(event.getUser());
        assertNull(event.getDescription());
        assertNotNull(event.getPets());
    }

    @Test
    void testEventSetters() {
        // Arrange
        Event event = new Event();
        Long eventId = 1L;
        Date date = new Date();
        String eventName= "Test event name";
        String eventPictureUrl="eventtesturl.jpg";
        Integer duration = 2;
        String address = "123 Main St";
        User organizer = new User();
        String description = "Test Event Description";

        // Create a set of pets for testing
        Set<Pet> pets = new HashSet<>();
        Pet pet1 = new Pet();
        Pet pet2 = new Pet();
        pets.add(pet1);
        pets.add(pet2);

        // Act
        event.setId(eventId);
        event.setDate(date);
        event.getEventName();
        event.getEventPictureUrl();
        event.setDuration(duration);
        event.setEventName(eventName);
        event.setEventPictureUrl(eventPictureUrl);
        event.setAddress(address);
        event.setUser(organizer);
        event.setDescription(description);
        event.setPets(pets);

        // Assert
        assertEquals(eventId, event.getId());
        assertEquals(date, event.getDate());
        assertEquals(eventName, event.getEventName());
        assertEquals(eventPictureUrl, event.getEventPictureUrl());
        assertEquals(duration, event.getDuration());
        assertEquals(address, event.getAddress());
        assertEquals(organizer, event.getUser());
        assertEquals(description, event.getDescription());
        assertEquals(pets, event.getPets());
    }
}