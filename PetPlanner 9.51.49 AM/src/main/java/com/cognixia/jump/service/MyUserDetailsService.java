package com.cognixia.jump.service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.cognixia.jump.model.User;
import com.cognixia.jump.repository.UserRepository;

@Service
public class MyUserDetailsService implements UserDetailsService {

	private static final Logger log = LoggerFactory.getLogger(MyUserDetailsService.class);

	@Autowired
	UserRepository repo;

	// method will by called by Spring Security when a request comes in
	// credentials (username + password) passed through the request will be loaded
	// in
	// username will be passed to this method (as an argument), then will call the
	// UserRepository in order to find a user with that username
	// As long as this user is found, User info will be passed to a UserDetails
	// object and returned

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		log.info("Loading user by username: " + username);
		Optional<User> userFound = repo.findByUsername(username);

		// Check if the user is found
		if (userFound.isPresent()) {
			User user = userFound.get();
			log.info("Found user: " + user.getUsername() + " with roles: " + user.getRole());

			// Return UserDetails
			return new MyUserDetails(user);
		} else {
			// User not found, throw exception
			throw new UsernameNotFoundException("No user with username = " + username);
		}
	}

}
