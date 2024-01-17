package com.cognixia.jump.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cognixia.jump.model.Event;
import com.cognixia.jump.model.Pet;
import com.cognixia.jump.model.User;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByUser(User user);

    List<Event> findByDate(Date date);

    List<Event> findByPets(Pet pet);


}
