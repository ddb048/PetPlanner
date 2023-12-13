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

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    // CREATE
    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    // READ
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    public List<Event> getEventsByOrganizer(User organizer) {
        return eventRepository.findByOrganizer(organizer);
    }

    public List<Event> getEventsByDate(Date date) {
        return eventRepository.findByDate(date);
    }

    public List<Pet> getPetsForEvent(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "id", eventId.toString()));
        return new ArrayList<>(event.getPets());
    }

    // UPDATE
    public Event updateEvent(Event event) {
        return eventRepository.findById(event.getId())
                .map(existingEvent -> eventRepository.save(event))
                .orElseThrow(() -> new ResourceNotFoundException("Event", "id", event.getId().toString()));
    }

    // DELETE
    public boolean deleteEvent(Long id) {
        if (eventRepository.existsById(id)) {
            eventRepository.deleteById(id);
            return true;
        }
        throw new ResourceNotFoundException("Event", "id", id.toString());
    }

    public List<Event> getAllEventsByUser(Long userId) {
        return eventRepository.findByOrganizer(userId);
    }

}
