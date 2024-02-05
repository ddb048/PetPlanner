package com.cognixia.jump.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognixia.jump.exception.ResourceNotFoundException;
import com.cognixia.jump.model.Pet;
import com.cognixia.jump.model.User;
import com.cognixia.jump.repository.UserRepository;
import com.cognixia.jump.service.PetService.DeletePetResult;
import com.cognixia.jump.service.PetService.UpdatePetResult;
import com.cognixia.jump.service.PetService.getPetsByUserResult;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    public enum createUserResult {
        SUCCESS
    }

    public enum getAllUsersResult {
    	SUCCESS,
        USERS_NOT_FOUND
    	
    }
    
    public enum getUserByIdResult {
    	SUCCESS,
        USER_NOT_FOUND
    	
    }
    
    public enum getPetsByUserResult {
    	SUCCESS,
        USER_NOT_FOUND,
        PETS_NOT_FOUND
    	
    }
    
    public enum getUserByUsernameResult {
    	SUCCESS,
        USER_NOT_FOUND
    	
    }
    
    public enum UpdateUserResult {
    	SUCCESS,
        USER_NOT_FOUND
    	
    }
    
    public enum DeleteUserResult {
        SUCCESS,
        USER_NOT_FOUND
    }
    // CREATE
    public createUserResult createUser(User user) {
        
    	userRepository.save(user);
        
        return createUserResult.SUCCESS;
           
    }

    // READ
    public List<User> getAllUsersHelper() {
        return userRepository.findAll();
    }
    
    public getAllUsersResult getAllUsers() {
    	
     List<User> users = userRepository.findAll();
     
     if(users.isEmpty())
     {
    	 return getAllUsersResult.USERS_NOT_FOUND;
     }
     
     return getAllUsersResult.SUCCESS;
     
    }
    
    
    public Optional<User> getUserByIdHelper(Long id) {
        return userRepository.findById(id);
    }
    
    public getUserByIdResult getUserById(Long Id) {
    	
    	Optional<User> user = userRepository.findById(Id);
    	
    	if(user.isEmpty())
    	{
    		return getUserByIdResult.USER_NOT_FOUND;
    	}
    	
    	return getUserByIdResult.SUCCESS;
    }
    
    

    public List<Pet> getPetsByUserHelper(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId.toString()));

        return new ArrayList<>(user.getPets());
    }
    
    
    public getPetsByUserResult getPetsByUser(Long userId) {
        
    	Optional<User> optionalUser = userRepository.findById(userId);
    	
    	if(optionalUser.isEmpty())
    	{
    		return getPetsByUserResult.USER_NOT_FOUND;
    	}
    	
    	 List<Pet> pets = optionalUser.get().getPets();
    	 
    	 if(pets.isEmpty())
    	 {
    		 return getPetsByUserResult.PETS_NOT_FOUND;
    	 }
    	 
    	 return getPetsByUserResult.SUCCESS;
    }
   

  
    public Optional<User> getUserByUsernameHelper(String username) {
        return userRepository.findByUsername(username);
    }
    
    public getUserByUsernameResult getUserByUsername(String username) {
    	
    	Optional<User> user = userRepository.findByUsername(username);
    	
    	if(user.isEmpty())
    	{
    		return getUserByUsernameResult.USER_NOT_FOUND;
    	}
    	
    	return getUserByUsername(username);
    }
    
    
    // UPDATE
    public UpdateUserResult updateUser(User user) {
        
    	Optional<User> optionalUser = userRepository.findById(user.getId());
    	
    	if(optionalUser.isEmpty())
    	{
    		return UpdateUserResult.USER_NOT_FOUND;
    	}
    	
    	
    	optionalUser.ifPresent(existingUser -> {
            existingUser.setRole(user.getRole());
            existingUser.setUsername(user.getUsername());
            existingUser.setProfilePic(user.getProfilePic());
            existingUser.setPassword(user.getPassword());
            existingUser.setEnabled(user.isEnabled());
            existingUser.setEmail(user.getEmail());
            
            
            userRepository.save(existingUser);
     
    	});
    	
        return UpdateUserResult.SUCCESS;
    	
    }

    // DELETE
    public DeleteUserResult deleteUser(Long id) {

    	Optional<User> optionalUser = userRepository.findById(id);
    	
    	if(optionalUser.isEmpty())
    	{
    		return DeleteUserResult.USER_NOT_FOUND;
    	}

    	optionalUser.ifPresent(user -> {
    	    user.getPets().forEach(pet -> {
    	        pet.getEvents().forEach(event -> {
    	            event.getPets().remove(pet);
    	        });
    	        pet.getEvents().clear();
    	    });
    	    user.getPets().clear();
    	    
    	    userRepository.delete(user);
    	});
    
    		return DeleteUserResult.SUCCESS;
    }
}
