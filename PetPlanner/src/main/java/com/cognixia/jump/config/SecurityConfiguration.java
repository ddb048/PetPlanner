package com.cognixia.jump.config;

import java.util.Arrays;

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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.cognixia.jump.filter.JwtRequestFilter;

@Configuration
public class SecurityConfiguration {

	// this user details service will manage users in an actual DB
	@Autowired
	UserDetailsService userDetailsService;

	@Autowired
	JwtRequestFilter jwtRequestFilter;

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // Specify the allowed origin
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		configuration.setAllowedHeaders(Arrays.asList("*"));
		configuration.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	// Authentication -> who are you?
	@Bean
	protected UserDetailsService userDetailsService() {

		return userDetailsService;
	}

	// Authorization - what do you want? (what can a user access?)
	@Bean
	protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		http
				.cors().configurationSource(corsConfigurationSource())
				.and()
				.csrf().disable()
				.authorizeHttpRequests()// anyone can ATTEMPT to create a JWT
				.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
				.antMatchers("/authenticate").permitAll()
				.antMatchers("/api/all").permitAll()
				.antMatchers("/openapi.html").permitAll()
				.antMatchers("/swagger-ui/**").permitAll()
				.antMatchers("/v3/api-docs/**").permitAll()
				.antMatchers(HttpMethod.POST, "/api/users").permitAll() // anyone can create a user (user sign ups)
				.antMatchers(HttpMethod.POST, "/api/pets/**").permitAll() // any user can create a pet
				.antMatchers(HttpMethod.POST, "/api/events/**").permitAll() // don't want just anyone to
				.antMatchers(HttpMethod.GET, "/api/pets/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/events/**").permitAll() // any user can view events
				.antMatchers(HttpMethod.DELETE, "/api/pets/**").permitAll() // any user can delete pets
				.antMatchers(HttpMethod.DELETE, "/api/events/**").permitAll()
				.antMatchers(HttpMethod.PUT, "/api/pets/**").permitAll() // any user can delete pets
				.antMatchers(HttpMethod.PUT, "/api/events/**").permitAll()
				.antMatchers(HttpMethod.PUT, "/api/users/**").permitAll()// any user can delete events
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
