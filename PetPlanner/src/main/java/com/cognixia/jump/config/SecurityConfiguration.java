package com.cognixia.jump.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.cognixia.jump.filter.JwtRequestFilter;

@Configuration
public class SecurityConfiguration {

	// this user details service will manage users in an actual DB
	@Autowired
	UserDetailsService userDetailsService;

	@Autowired
	JwtRequestFilter jwtRequestFilter;

	// Authentication -> who are you?
	@Bean
	protected UserDetailsService userDetailsService() {

		return userDetailsService;
	}

	// Authorization - what do you want? (what can a user access?)
	@Bean
	protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		http.csrf().disable()
				.authorizeHttpRequests()
				.antMatchers("/api/admin").hasRole("ADMIN")
				.antMatchers("/api/all").permitAll()
				.antMatchers(HttpMethod.POST, "/api/users").permitAll() // anyone can create a user (user sign ups)
				.antMatchers(HttpMethod.POST, "/api/pets/**").hasRole("USER") // any user can create a pet
				.antMatchers(HttpMethod.POST, "/api/events/**").hasRole("USER") // don't want just anyone to be able to
				.antMatchers(HttpMethod.GET, "/api/pets/**").hasRole("USER") // any user can view pets
				.antMatchers(HttpMethod.GET, "/api/events/**").hasRole("USER") // any user can view events
				.antMatchers(HttpMethod.DELETE, "/api/pets/**").hasRole("USER") // any user can delete pets
				.antMatchers(HttpMethod.DELETE, "/api/events/**").hasRole("USER") // any user can delete events
				.antMatchers("/authenticate").permitAll() // anyone can ATTEMPT to create a JWT
				.anyRequest().authenticated() // if not specified, all other end points need a user login
				.and()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS); // tell spring security NOT
																								// to create sessions

		// this request will go through many filters, make sure that the FIRST filter
		// that is checked is
		// the filter for jwts, in order to make sure of that, the filter has to be
		// checked before you check the
		// username & password (filter)
		http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	// Encoder -> method that will be used to encode/decode user passwords
	@Bean
	protected PasswordEncoder encoder() {

		// plain text encoder -> won't do any actual encoding
		return NoOpPasswordEncoder.getInstance();

		// return new BCryptPasswordEncoder();

	}

	// load the encoder & user details service that are needed for spring security
	// to do authentication
	@Bean
	protected DaoAuthenticationProvider authenticationProvider() {

		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

		authProvider.setUserDetailsService(userDetailsService);
		authProvider.setPasswordEncoder(encoder());

		return authProvider;
	}

	// can autowire and access the authentication manager (manages authentication
	// (login) of our project)
	@Bean
	protected AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
		return authConfig.getAuthenticationManager();
	}

}
