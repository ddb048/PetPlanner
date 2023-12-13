package com.cognixia.jump.JunitTest;
import com.cognixia.jump.service.EventService;
import com.cognixia.jump.repository.EventRepository;
import com.cognixia.jump.exception.ResourceNotFoundException;
import com.cognixia.jump.model.Event;
import com.cognixia.jump.model.User;
import com.cognixia.jump.model.Pet;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class EventServiceTest {

    @Mock
    private EventRepository eventRepository;

    @InjectMocks
    private EventService eventService;

    @Test
    public void testCreateEvent() {
        // Arrange
        Event eventToCreate = new Event();
        Event createdEvent = new Event();
        when(eventRepository.save(eventToCreate)).thenReturn(createdEvent);

        // Act
        Event result = eventService.createEvent(eventToCreate);

        // Assert
        assertNotNull(result);
        assertEquals(createdEvent, result);
    }

    @Test
    public void testGetAllEvents() {
        // Arrange
        List<Event> events = new ArrayList<>();
        when(eventRepository.findAll()).thenReturn(events);

        // Act
        List<Event> result = eventService.getAllEvents();

        // Assert
        assertNotNull(result);
        assertEquals(events, result);
    }

    @Test
    public void testGetEventById() {
        // Arrange
        Long eventId = 1L;
        Event event = new Event();
        when(eventRepository.findById(eventId)).thenReturn(Optional.of(event));

        // Act
        Optional<Event> result = eventService.getEventById(eventId);

        // Assert
        assertNotNull(result);
        assertTrue(result.isPresent());
        assertEquals(event, result.get());
    }

    @Test
    public void testGetEventsByOrganizer() {
        // Arrange
        User organizer = new User();
        List<Event> events = new ArrayList<>();
        when(eventRepository.findByOrganizer(organizer)).thenReturn(events);

        // Act
        List<Event> result = eventService.getEventsByOrganizer(organizer);

        // Assert
        assertNotNull(result);
        assertEquals(events, result);
    }

    @Test
    public void testGetEventsByDate() {
        // Arrange
        Date date = new Date();
        List<Event> events = new ArrayList<>();
        when(eventRepository.findByDate(date)).thenReturn(events);

        // Act
        List<Event> result = eventService.getEventsByDate(date);

        // Assert
        assertNotNull(result);
        assertEquals(events, result);
    }

    @Test
    public void testGetPetsForEvent() {
        // Arrange
        Long eventId = 1L;
        Event event = new Event();
        event.setId(eventId);
        when(eventRepository.findById(eventId)).thenReturn(Optional.of(event));

        // Act
        List<Pet> result = eventService.getPetsForEvent(eventId);

        // Assert
        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    public void testUpdateEvent() {
        // Arrange
        Event eventToUpdate = new Event();
        eventToUpdate.setId(1L);
        Event existingEvent = new Event();
        when(eventRepository.findById(1L)).thenReturn(Optional.of(existingEvent));
        when(eventRepository.save(eventToUpdate)).thenReturn(eventToUpdate);

        // Act
        Event result = eventService.updateEvent(eventToUpdate);

        // Assert
        assertNotNull(result);
        assertEquals(eventToUpdate, result);
    }

    @Test
    public void testDeleteEvent() {
        // Arrange
        Long eventId = 1L;
        when(eventRepository.existsById(eventId)).thenReturn(true);
        doNothing().when(eventRepository).deleteById(eventId);

        // Act
        boolean result = eventService.deleteEvent(eventId);

        // Assert
        assertTrue(result);
    }

    @Test
    public void testDeleteEvent_NotFound() {
        // Arrange
        Long eventId = 1L;
        when(eventRepository.existsById(eventId)).thenReturn(false);

        // Act and Assert
        assertThrows(ResourceNotFoundException.class, () -> eventService.deleteEvent(eventId));
    }

    @Test
    public void testGetAllEventsByUser() {
        // Arrange
        Long userId = 1L;
        List<Event> events = new ArrayList<>();
        when(eventRepository.findByOrganizer(userId)).thenReturn(events);

        // Act
        List<Event> result = eventService.getAllEventsByUser(userId);

        // Assert
        assertNotNull(result);
        assertEquals(events, result);
    }
}