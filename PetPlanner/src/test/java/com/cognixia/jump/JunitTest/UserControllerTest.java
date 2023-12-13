package com.cognixia.jump.JunitTest;

import com.cognixia.jump.service.UserService;
import com.cognixia.jump.service.EventService;
import com.cognixia.jump.model.User;
import com.cognixia.jump.model.Pet;
import com.cognixia.jump.model.Event;

import com.cognixia.jump.controller.UserController;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

public class UserControllerTest {

    @Mock
    private UserService userService;

    @Mock
    private EventService eventService;

    @InjectMocks
    private UserController userController;

    @Test
    public void testGetAllUsers() {
        // Arrange
        List<User> users = Arrays.asList(new User(), new User());
        when(userService.getAllUsers()).thenReturn(users);

        // Act
        ResponseEntity<List<User>> responseEntity = userController.getAllUsers();

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals(users, responseEntity.getBody());
    }

    @Test
    public void testGetUserById() {
        // Arrange
        Long userId = 1L;
        User user = new User();
        when(userService.getUserById(userId)).thenReturn(Optional.of(user));

        // Act
        ResponseEntity<Optional<User>> responseEntity = userController.getUserById(userId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals(user, responseEntity.getBody().orElse(null));
    }

    @Test
    public void testGetAllEventsByUser() {
        // Arrange
        Long userId = 1L;
        List<Event> events = Arrays.asList(new Event(), new Event());
        when(eventService.getAllEventsByUser(userId)).thenReturn(events);

        // Act
        ResponseEntity<List<Event>> responseEntity = userController.getAllEventsByUser(userId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals(events, responseEntity.getBody());
    }

    @Test
    public void testGetPetsByUser() {
        // Arrange
        Long userId = 1L;
        List<Pet> pets = Arrays.asList(new Pet(), new Pet());
        when(userService.getPetsByUser(userId)).thenReturn(pets);

        // Act
        ResponseEntity<List<Pet>> responseEntity = userController.getPetsByUser(userId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals(pets, responseEntity.getBody());
    }

    @Test
    public void testCreateUser() {
        // Arrange
        User userToCreate = new User();
        User createdUser = new User();
        when(userService.createUser(userToCreate)).thenReturn(createdUser);

        // Act
        ResponseEntity<User> responseEntity = userController.createUser(userToCreate);

        // Assert
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals(createdUser, responseEntity.getBody());
    }

    @Test
    public void testUpdateUser() {
        // Arrange
        Long userId = 1L;
        User userDetails = new User();
        User existingUser = new User();
        when(userService.getUserById(userId)).thenReturn(Optional.of(existingUser));
        when(userService.updateUser(existingUser)).thenReturn(existingUser);

        // Act
        ResponseEntity<User> responseEntity = userController.updateUser(userId, userDetails);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals(existingUser, responseEntity.getBody());
    }

    @Test
    public void testDeleteUser() {
        // Arrange
        Long userId = 1L;
        doNothing().when(userService).deleteUser(userId);

        // Act
        ResponseEntity<?> responseEntity = userController.deleteUser(userId);

        // Assert
        assertEquals(HttpStatus.NO_CONTENT, responseEntity.getStatusCode());
    }
}