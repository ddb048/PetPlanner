package com.cognixia.jump.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognixia.jump.exception.ResourceNotFoundException;
import com.cognixia.jump.model.Event;
import com.cognixia.jump.model.Pet;
import com.cognixia.jump.model.User;
import com.cognixia.jump.repository.EventRepository;
import com.cognixia.jump.repository.UserRepository;
import com.cognixia.jump.service.PetService.DeletePetResult;
import com.cognixia.jump.service.PetService.UpdatePetResult;
import com.cognixia.jump.service.PetService.createPetResult;
import com.cognixia.jump.service.PetService.getAllPetsResult;
import com.cognixia.jump.service.PetService.getPetByIdResult;
import com.cognixia.jump.service.PetService.getPetsByUserResult;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;
    
    public enum createEventResult {
        SUCCESS
    }
    
    public enum getAllEventsResult {
    	SUCCESS,
        EVENT_NOT_FOUND
    }
    
    public enum getEventByIdResult {
    	SUCCESS,
        EVENT_NOT_FOUND
    }
    
    public enum getEventsByUserResult {
    	SUCCESS,
        USER_NOT_FOUND,
        EVENTS_NOT_FOUND
    	
    }
    public enum getEventsByDateResult {
    	SUCCESS,
        EVENTS_NOT_FOUND
    	
    }
    
    public enum getPetsForEventResult {
    	SUCCESS,
        PETS_NOT_FOUND,
        EVENT_NOT_FOUND
    	
    }

    public enum UpdateEventResult {
    	SUCCESS,
        EVENT_NOT_FOUND,
        USER_NOT_FOUND
    	
    }
    
    public enum DeleteEventResult {
        SUCCESS,
        EVENT_NOT_FOUND
    }
    
    public enum getAllEventsByUserResult {
    	SUCCESS,
        USER_NOT_FOUND,
        EVENTS_NOT_FOUND
    	
    }

    // CREATE
    public createEventResult createEvent(Event event) {
        
    	eventRepository.save(event);
        
    	return createEventResult.SUCCESS;
    }
    

    // READ
    public List<Event> getAllEventsHelper() {
        return eventRepository.findAll();
    }
    
    public getAllEventsResult getAllEvents() {
        
    	List<Event> events = eventRepository.findAll();
    	
    	if(events.isEmpty())
    	{
    		return getAllEventsResult.EVENT_NOT_FOUND;
    	}
    	
    	
    	return getAllEventsResult.SUCCESS;
    }
    
    
    public Optional<Event> getEventByIdHelper(Long id) {
        return eventRepository.findById(id);
    }
    
    public getEventByIdResult getEventById(Long id) {
        
    	Optional<Event> optionalEvent = eventRepository.findById(id);
    	
    	if(optionalEvent.isEmpty())
    	{
    		return getEventByIdResult.EVENT_NOT_FOUND;
    	}
    	
    	return getEventByIdResult.SUCCESS;
    }
   
    public List<Event> getEventsByUserHelper(User user) {
        return eventRepository.findByUser(user);
    }
    
    public getEventsByUserResult getEventsByUser(Long userId) {
        
    	Optional<User> optionalUser = userRepository.findById(userId);
    	
    	if(optionalUser.isEmpty())
    	{
    		return getEventsByUserResult.USER_NOT_FOUND;
    	}
    	
    	 List<Event> events = eventRepository.findByUser(optionalUser.get());
    	 
    	 if(events.isEmpty())
    	 {
    		 return getEventsByUserResult.EVENTS_NOT_FOUND;
    	 }
    	 
    	 return getEventsByUserResult.SUCCESS;
    }

    public List<Event> getEventsByDateHelper(Date date) {
        return eventRepository.findByDate(date);
    }
    
    public getEventsByDateResult getEventsByDate(Date date) {
        
    	List<Event> events = eventRepository.findByDate(date);
    	
    	if(events.isEmpty())
    	{
    		return getEventsByDateResult.EVENTS_NOT_FOUND;
    	}
    	
    	return getEventsByDateResult.SUCCESS;
    	
    }
    
  
    public List<Pet> getPetsForEventHelper(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "id", eventId.toString()));
        return new ArrayList<>(event.getPets());
    }
    
    public getPetsForEventResult getPetsForEvent(Long eventId) {
        
    	Optional<Event> event = eventRepository.findById(eventId);
        
        
        if(event.isEmpty())
        {
        	return getPetsForEventResult.EVENT_NOT_FOUND;
        }
        
        List<Pet> pets = new ArrayList<>(event.get().getPets());
        
        if(pets.isEmpty())
        {
        	return getPetsForEventResult.PETS_NOT_FOUND;
        }
        
       return getPetsForEventResult.SUCCESS;
    }
    
    
    
    // UPDATE
    public UpdateEventResult updateEvent(Event event) {
    	
    	Optional<Event> optionalEvent = eventRepository.findById(event.getId());
    	Optional<User> user = userRepository.findById(event.getUser().getId());
    	
    	if(optionalEvent.isEmpty())
    	{
    		return UpdateEventResult.EVENT_NOT_FOUND;
    	}
    	
    	if(user.isEmpty())
        {
        	return UpdateEventResult.USER_NOT_FOUND;
        }
    	
    	optionalEvent.ifPresent(existingEvent -> {
                    existingEvent.setEventPictureUrl(event.getEventPictureUrl());
                    existingEvent.setEventName(event.getEventName());
                    existingEvent.setDuration(event.getDuration());
                    existingEvent.setDescription(event.getDescription());
                    existingEvent.setDate(event.getDate());
                    existingEvent.setAddress(event.getAddress());
                    
                    existingEvent.setUser(user.get());
                    
                    eventRepository.save(existingEvent);
             
    	});
    	
        return UpdateEventResult.SUCCESS;
    }

  
    // DELETE
    public DeleteEventResult deleteEvent(Long id) {

    	Optional<Event> optionalEvent = eventRepository.findById(id);
    	
    
    	if(optionalEvent.isEmpty())
    	{
    		return DeleteEventResult.EVENT_NOT_FOUND;
    	}
    	
    	
    	eventRepository.deleteById(id);
      
    	return DeleteEventResult.SUCCESS;
    }

   
    public List<Event> getAllEventsByUserHelper(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId.toString()));
        return eventRepository.findByUser(user);
    }
    
    public getAllEventsByUserResult getAllEventsByUser(Long userId) {

    	Optional<User> optionalUser = userRepository.findById(userId);
    	
    	if(optionalUser.isEmpty())
    	{
    		return getAllEventsByUserResult.USER_NOT_FOUND;
    	}
    	
    	 List<Event> events = eventRepository.findByUser(optionalUser.get());
    	 
    	 if(events.isEmpty())
    	 {
    		 return getAllEventsByUserResult.EVENTS_NOT_FOUND;
    	 }
    	 
    	 return getAllEventsByUserResult.SUCCESS;
    }

}
