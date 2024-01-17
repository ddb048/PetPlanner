package com.cognixia.jump.JunitTest;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.cognixia.jump.exception.ResourceNotFoundException;
import com.cognixia.jump.model.Event;
import com.cognixia.jump.model.Pet;
import com.cognixia.jump.model.User;
import com.cognixia.jump.repository.EventRepository;
import com.cognixia.jump.repository.UserRepository;
import com.cognixia.jump.service.EventService;
@ExtendWith(MockitoExtension.class)
class EventServiceTest {

    @Mock
    private EventRepository eventRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private EventService eventService;

    @Test
    void createEvent() {
        // Arrange
        Event event = new Event();
        when(eventRepository.save(any(Event.class))).thenReturn(event);

        // Act
        Event createdEvent = eventService.createEvent(event);

        // Assert
        verify(eventRepository, times(1)).save(event);
        assertSame(event, createdEvent);
    }

    @Test
    void getAllEvents() {
        // Arrange
        List<Event> events = new ArrayList<>();
        when(eventRepository.findAll()).thenReturn(events);

        // Act
        List<Event> result = eventService.getAllEvents();

        // Assert
        verify(eventRepository, times(1)).findAll();
        assertSame(events, result);
    }

    @Test
    void getEventById() {
        // Arrange
        Long eventId = 1L;
        Optional<Event> event = Optional.of(new Event());
        when(eventRepository.findById(eventId)).thenReturn(event);

        // Act
        Optional<Event> result = eventService.getEventById(eventId);

        // Assert
        verify(eventRepository, times(1)).findById(eventId);
        assertSame(event, result);
    }

    @Test
    void getEventsByOrganizer() {
        // Arrange
        User user = new User();
        List<Event> events = new ArrayList<>();
        when(eventRepository.findByUser(user)).thenReturn(events);

        // Act
        List<Event> result = eventService.getEventsByUser(user);

        // Assert
        verify(eventRepository, times(1)).findByUser(user);
        assertSame(events, result);
    }

    @Test
    void getEventsByDate() {
        // Arrange
        Date date = new Date();
        List<Event> events = new ArrayList<>();
        when(eventRepository.findByDate(date)).thenReturn(events);

        // Act
        List<Event> result = eventService.getEventsByDate(date);

        // Assert
        verify(eventRepository, times(1)).findByDate(date);
        assertSame(events, result);
    }

    @Test
    void getPetsForEvent() {
        // Arrange
        Long eventId = 1L;
        Event event = new Event();

        // Assuming setPets method in Event class takes a Set<Pet>
        HashSet<Pet> expectedPetsSet = new HashSet<>(); // import java.util.HashSet
        event.setPets(expectedPetsSet);

        when(eventRepository.findById(eventId)).thenReturn(Optional.of(event));

        // Act
        List<Pet> result = eventService.getPetsForEvent(eventId);

        // Assert
        verify(eventRepository, times(1)).findById(eventId);

        // Use AssertJ for a more convenient comparison of collections
        assertThat(result).containsExactlyInAnyOrderElementsOf(expectedPetsSet);
    }

    @Test
    void updateEvent() {
        // Arrange
        Event existingEvent = new Event();
        Event updatedEvent = new Event();
        when(eventRepository.findById(any())).thenReturn(Optional.of(existingEvent));
        when(eventRepository.save(any(Event.class))).thenReturn(updatedEvent);

        // Act
        Event result = eventService.updateEvent(new Event());

        // Assert
        verify(eventRepository, times(1)).findById(any());
        verify(eventRepository, times(1)).save(any(Event.class));
        assertSame(updatedEvent, result);
    }

   

    @Test
    void deleteEvent() {
        // Arrange
        Long eventId = 1L;
        when(eventRepository.existsById(eventId)).thenReturn(true);

        // Act
        boolean result = eventService.deleteEvent(eventId);

        // Assert
        verify(eventRepository, times(1)).existsById(eventId);
        verify(eventRepository, times(1)).deleteById(eventId);
        assertTrue(result);
    }

    @Test
    void deleteEventNotFound() {
        // Arrange
        Long eventId = 1L;
        when(eventRepository.existsById(eventId)).thenReturn(false);

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> eventService.deleteEvent(eventId));
    }

    @Test
    void getAllEventsByUser() {
        // Arrange
        Long userId = 1L;
        User user = new User();
        List<Event> events = new ArrayList<>();
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(eventRepository.findByUser(user)).thenReturn(events);

        // Act
        List<Event> result = eventService.getAllEventsByUser(userId);

        // Assert
        verify(userRepository, times(1)).findById(userId);
        verify(eventRepository, times(1)).findByUser(user);
        assertSame(events, result);
    
    }}