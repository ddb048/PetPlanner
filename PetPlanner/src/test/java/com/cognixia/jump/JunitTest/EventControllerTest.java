package com.cognixia.jump.JunitTest;

import static org.junit.Assert.assertSame;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.cognixia.jump.exception.ResourceNotFoundException;
import com.cognixia.jump.model.Event;
import com.cognixia.jump.model.Pet;
import com.cognixia.jump.service.EventService;
import com.cognixia.jump.controller.EventController;

@ExtendWith(MockitoExtension.class)
class EventControllerTest {

    @Mock
    private EventService eventService;

    @InjectMocks
    private EventController eventController;

    @Test
    void getAllEvents() {
        // Arrange
        List<Event> events = new ArrayList<>();
        when(eventService.getAllEvents()).thenReturn(events);

        // Act
        ResponseEntity<List<Event>> response = eventController.getAllEvents();

        // Assert
        verify(eventService, times(1)).getAllEvents();
        assertSame(HttpStatus.OK, response.getStatusCode());
        assertSame(events, response.getBody());
    }

    @Test
    void getEventById() {
        // Arrange
        Long eventId = 1L;
        Optional<Event> event = Optional.of(new Event());
        when(eventService.getEventById(eventId)).thenReturn(event);

        // Act
        ResponseEntity<Optional<Event>> response = eventController.getEventById(eventId);

        // Assert
        verify(eventService, times(1)).getEventById(eventId);
        assertSame(HttpStatus.OK, response.getStatusCode());
        assertSame(event, response.getBody());
    }

    @Test
    void getPetsByEvent() {
        // Arrange
        Long eventId = 1L;
        List<Pet> pets = new ArrayList<>();
        when(eventService.getPetsForEvent(eventId)).thenReturn(pets);

        // Act
        ResponseEntity<List<Pet>> response = eventController.getPetsByEvent(eventId);

        // Assert
        verify(eventService, times(1)).getPetsForEvent(eventId);
        assertSame(HttpStatus.OK, response.getStatusCode());
        assertSame(pets, response.getBody());
    }

    @Test
    void createEvent() {
        // Arrange
        Event event = new Event();
        when(eventService.createEvent(event)).thenReturn(event);

        // Act
        ResponseEntity<Event> response = eventController.createEvent(event);

        // Assert
        verify(eventService, times(1)).createEvent(event);
        assertSame(HttpStatus.CREATED, response.getStatusCode());
        assertSame(event, response.getBody());
    }

    @Test
    void updateEvent() {
        // Arrange
        Long eventId = 1L;
        Event existingEvent = new Event();
        Event updatedEvent = new Event();
        when(eventService.getEventById(eventId)).thenReturn(Optional.of(existingEvent));
        when(eventService.updateEvent(any(Event.class))).thenReturn(updatedEvent);

        // Act
        ResponseEntity<Event> response = eventController.updateEvent(eventId, new Event());

        // Assert
        verify(eventService, times(1)).getEventById(eventId);
        verify(eventService, times(1)).updateEvent(any(Event.class));
        assertSame(HttpStatus.OK, response.getStatusCode());
        assertSame(updatedEvent, response.getBody());
    }

    
    @Test
    void deleteEvent() {
        // Arrange
        Long eventId = 1L;

        // Act
        ResponseEntity<?> response = eventController.deleteEvent(eventId);

        // Assert
        verify(eventService, times(1)).deleteEvent(eventId);
        assertSame(HttpStatus.NO_CONTENT, response.getStatusCode());
    }
}