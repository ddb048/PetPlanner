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
import com.cognixia.jump.model.User;
import com.cognixia.jump.repository.UserRepository;
import com.cognixia.jump.service.EventService;
import com.cognixia.jump.service.PetService;
import com.cognixia.jump.service.UserService;
import com.cognixia.jump.util.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private EventService eventService;

    @GetMapping
    @Operation(summary = "Get all users", description = "Retrieves a list of all users")
    public ResponseEntity<ApiResponse> getAllUsers() {
    	
    	UserService.getAllUsersResult result = userService.getAllUsers();
    	
    	switch (result) {
        case SUCCESS:
        	List<User> users = userService.getAllUsersHelper();
            return ResponseEntity.ok(new ApiResponse(true, "All users have been founded successfully", users));
        case USERS_NOT_FOUND:
            return ResponseEntity.badRequest().body(new ApiResponse(false, "There are no users"));
        default:
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An unexpected error occurred"));
    	}
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get user by ID", description = "Retrieves a single user by their ID")
    public ResponseEntity<ApiResponse> getUserById(@PathVariable Long id) {

    	UserService.getUserByIdResult result = userService.getUserById(id);
    	
    	switch (result) {
        case SUCCESS:
        	Optional<User> user = userService.getUserByIdHelper(id);
            return ResponseEntity.ok(new ApiResponse(true, "User have been founded successfully", user.get()));
        case USER_NOT_FOUND:
            return ResponseEntity.badRequest().body(new ApiResponse(false, "This User does not exist"));
        default:
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An unexpected error occurred"));
    	}
    }

    @GetMapping("/{userId}/events")
    @Operation(summary = "Get all events by user", description = "Retrieves all events organized by a specific user")
    public ResponseEntity<ApiResponse> getAllEventsByUser(@PathVariable Long userId) {
    	
    	EventService.getAllEventsByUserResult result = eventService.getAllEventsByUser(userId);
    	
    	switch (result) {
        case SUCCESS:
        	Optional<User> user = userService.getUserByIdHelper(userId);
        	List<Event> events = eventService.getEventsByUserHelper(user.get());
            return ResponseEntity.ok(new ApiResponse(true, "User's Events have been founded successfully", events));
        case USER_NOT_FOUND:
            return ResponseEntity.badRequest().body(new ApiResponse(false, "This User does not exist"));
        case EVENTS_NOT_FOUND:
            return ResponseEntity.badRequest().body(new ApiResponse(false, "There are no events for this User"));
        default:
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An unexpected error occurred"));
    	}
    	
    }

    @GetMapping("/{userId}/pets")
    @Operation(summary = "Get all pets by user", description = "Retrieves all pets owned by a specific user")
    public ResponseEntity<ApiResponse> getPetsByUser(@PathVariable Long userId) {
    	
    	UserService.getPetsByUserResult result = userService.getPetsByUser(userId);
    	
    	switch (result) {
        case SUCCESS:
        	List<Pet> pets = userService.getPetsByUserHelper(userId);
            return ResponseEntity.ok(new ApiResponse(true, "User's pets have been founded successfully", pets ));
        case PETS_NOT_FOUND:
            return ResponseEntity.badRequest().body(new ApiResponse(false, "This User has no pets"));
        case USER_NOT_FOUND:
            return ResponseEntity.badRequest().body(new ApiResponse(false, "This User does not exist"));
        default:
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An unexpected error occurred"));
    	}
    }

    @PostMapping
    @Operation(summary = "Create a new user", description = "Creates a new user and adds them to the database")
    public ResponseEntity<ApiResponse> createUser(@RequestBody User user) {

    	UserService.createUserResult result = userService.createUser(user);
    	
    	switch (result) {
        case SUCCESS:
        	Optional<User> optionalUser = userService.getUserByIdHelper(user.getId());
        	
            return ResponseEntity.ok(new ApiResponse(true, "User has been created successfully", optionalUser));
        default:
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An unexpected error occurred"));
    	}
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a user", description = "Updates the details of an existing user")
    public ResponseEntity<ApiResponse> updateUser(@PathVariable Long id, @Valid @RequestBody User userDetails) {
    	
    	UserService.UpdateUserResult result = userService.updateUser(userDetails);
    	
    	switch (result) {
        case SUCCESS:
        	Optional<User> optionalUser = userService.getUserByIdHelper(userDetails.getId());
            return ResponseEntity.ok(new ApiResponse(true, "User has been updated successfully", optionalUser));
        case USER_NOT_FOUND:
        	return ResponseEntity.badRequest().body(new ApiResponse(false, "This user does not exist"));
        default:
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An unexpected error occurred"));
    	}    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a user", description = "Deletes a user from the database by their ID")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
    	
    	UserService.DeleteUserResult result = userService.deleteUser(id);
    	
    	switch (result) {
        case SUCCESS:
            return ResponseEntity.ok(new ApiResponse(true, "User has been deleted successfully"));
        case USER_NOT_FOUND:
            return ResponseEntity.badRequest().body(new ApiResponse(false, "This user does not exist"));
        default:
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An unexpected error occurred"));
    }
    }
}
