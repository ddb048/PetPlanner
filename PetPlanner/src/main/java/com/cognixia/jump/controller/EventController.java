package com.cognixia.jump.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognixia.jump.exception.ResourceNotFoundException;
import com.cognixia.jump.model.Event;
import com.cognixia.jump.model.Pet;
import com.cognixia.jump.service.EventService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping
    @Operation(summary = "Get all events", description = "Retrieves a list of all events")
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get event by ID", description = "Retrieves details of an event by their ID")
    public ResponseEntity<Optional<Event>> getEventById(@PathVariable Long id) {
        Optional<Event> event = eventService.getEventById(id);
        return ResponseEntity.ok(event);
    }

    @GetMapping("/{eventId}/pets")
    @Operation(summary = "Get all pets by event", description = "Retrieves all pets attending a specific event")
    public ResponseEntity<List<Pet>> getPetsByEvent(@PathVariable Long eventId) {
        List<Pet> pets = eventService.getPetsForEvent(eventId);
        return ResponseEntity.ok(pets);
    }

    @PostMapping
    @Operation(summary = "Create a new event", description = "Adds a new event to the database")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        return new ResponseEntity<>(eventService.createEvent(event), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an event", description = "Updates the details of an existing event")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @Valid @RequestBody Event eventDetails) {
        Event event = eventService.getEventById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "id", id.toString()));

        event.setDate(eventDetails.getDate());
        event.setEventName(eventDetails.getEventName());
        event.setEventPictureUrl(eventDetails.getEventPictureUrl());
        event.setDuration(eventDetails.getDuration());
        event.setAddress(eventDetails.getAddress());
        event.setUser(eventDetails.getUser());
        event.setDescription(eventDetails.getDescription());
        event.setPets(eventDetails.getPets());

        Event updatedEvent = eventService.updateEvent(event);
        return ResponseEntity.ok(updatedEvent);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete an event", description = "Deletes an event from the database by their ID")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }
}
