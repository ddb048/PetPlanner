package com.cognixia.jump.JunitTest;
import com.cognixia.jump.controller.EventController;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.cognixia.jump.model.Event;
import com.cognixia.jump.model.Pet;
import com.cognixia.jump.service.EventService;

class EventControllerTest {

    @Mock
    private EventService eventService;

    @InjectMocks
    private EventController eventController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllEvents() {
        // Arrange
        List<Event> events = new ArrayList<>();
        events.add(new Event());
        events.add(new Event());

        when(eventService.getAllEvents()).thenReturn(events);

        // Act
        ResponseEntity<List<Event>> response = eventController.getAllEvents();

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(events, response.getBody());
    }

    @Test
    void testGetEventById() {
        // Arrange
        Long eventId = 1L;
        Event event = new Event();
        event.setId(eventId);

        when(eventService.getEventById(eventId)).thenReturn(Optional.of(event));

        // Act
        ResponseEntity<Optional<Event>> response = eventController.getEventById(eventId);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().isPresent());
        assertEquals(event, response.getBody().get());
    }

   

}