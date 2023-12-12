package com.cognixia.jump.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.cognixia.jump.model.User;
import com.cognixia.jump.repository.UserRepository;


@Service
public class MyUserDetailsService implements UserDetailsService {

	@Autowired
	UserRepository repo;

	
	// method will by called by Spring Security when a request comes in
	// credentials (username + password) passed through the request will be loaded in
	// username will be passed to this method (as an argument), then will call the UserRepository in order to find a user with that username
	// As long as this user is found, User info will be passed to a UserDetails object and returned
		
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		Optional<User> userFound = repo.findByUsername(username);
		
		// if username doesn't exist in the table, throw an exception
		if(userFound.isEmpty()) {
			throw new UsernameNotFoundException("No user with username = " + username);
		}
		
		// as long as we found the user, create a user details object with all the relevant info for security 
		// security will take this object and perform authorization & authentication
		return new MyUserDetails( userFound.get() );
	}

}