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
import com.cognixia.jump.service.PetService;
import com.cognixia.jump.util.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping
    @Operation(summary = "Get all events", description = "Retrieves a list of all events")
    public ResponseEntity<ApiResponse> getAllEvents() {

    	EventService.getAllEventsResult result = eventService.getAllEvents();
    	
    	switch (result) {
        case SUCCESS:
        	List<Event> events = eventService.getAllEventsHelper();
            return ResponseEntity.ok(new ApiResponse(true, "All events have been founded successfully", events));
        case EVENT_NOT_FOUND:
            return ResponseEntity.badRequest().body(new ApiResponse(false, "There are no events"));
        default:
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An unexpected error occurred"));
    	}
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get event by ID", description = "Retrieves details of an event by their ID")
    public ResponseEntity<ApiResponse> getEventById(@PathVariable Long id) {
    	
    	EventService.getEventByIdResult result = eventService.getEventById(id);
    	
    	switch (result) {
        case SUCCESS:
        	Optional<Event> event = eventService.getEventByIdHelper(id);
            return ResponseEntity.ok(new ApiResponse(true, "Event have been founded successfully", event.get()));
        case EVENT_NOT_FOUND:
            return ResponseEntity.badRequest().body(new ApiResponse(false, "This Event does not exist"));
        default:
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An unexpected error occurred"));
    	}
    }

    @GetMapping("/{eventId}/pets")
    @Operation(summary = "Get all pets by event", description = "Retrieves all pets attending a specific event")
    public ResponseEntity<ApiResponse> getPetsByEvent(@PathVariable Long eventId) {

    	EventService.getPetsForEventResult result = eventService.getPetsForEvent(eventId);
    	
    	switch (result) {
        case SUCCESS:
        	List<Pet> pets = eventService.getPetsForEventHelper(eventId);
            return ResponseEntity.ok(new ApiResponse(true, "Event's pets have been founded successfully", pets));
        case PETS_NOT_FOUND:
            return ResponseEntity.badRequest().body(new ApiResponse(false, "There are no pets for this event"));
        case EVENT_NOT_FOUND:
            return ResponseEntity.badRequest().body(new ApiResponse(false, "This Event does not exist"));
        default:
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An unexpected error occurred"));
    	}
    }

    @PostMapping
    @Operation(summary = "Create a new event", description = "Adds a new event to the database")
    public ResponseEntity<ApiResponse> createEvent(@RequestBody Event event) {
    	
    	EventService.createEventResult result = eventService.createEvent(event);
    	switch (result) {
        
    	case SUCCESS:
            return ResponseEntity.ok(new ApiResponse(true, "Event has been created successfully"));
        default:
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An unexpected error occurred"));
    	}
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an event", description = "Updates the details of an existing event")
    public ResponseEntity<ApiResponse> updateEvent(@PathVariable Long id, @Valid @RequestBody Event eventDetails) {

    	EventService.UpdateEventResult result = eventService.updateEvent(eventDetails);
    	
    	switch (result) {
        case SUCCESS:
            return ResponseEntity.ok(new ApiResponse(true, "Event has been updated successfully"));
        case EVENT_NOT_FOUND:
            return ResponseEntity.badRequest().body(new ApiResponse(false, "This event does not exist"));
        case USER_NOT_FOUND:
        	return ResponseEntity.badRequest().body(new ApiResponse(false, "This user does not exist"));
        default:
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An unexpected error occurred"));
    	}
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete an event", description = "Deletes an event from the database by their ID")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
    	
    	EventService.DeleteEventResult result = eventService.deleteEvent(id);
    	
    	switch (result) {
        case SUCCESS:
            return ResponseEntity.ok(new ApiResponse(true, "Event has been deleted successfully"));
        case EVENT_NOT_FOUND:
            return ResponseEntity.badRequest().body(new ApiResponse(false, "This pet does not exist"));
        default:
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An unexpected error occurred"));
    }
    }
}
