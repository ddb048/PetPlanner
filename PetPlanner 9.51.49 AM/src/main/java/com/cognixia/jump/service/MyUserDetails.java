package com.cognixia.jump.service;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.cognixia.jump.model.User;

// UserDetails class -> inherit from the UserDetails interface
//					 -> used by spring security to find all the necessary info for authorization & authentication
public class MyUserDetails implements UserDetails {

	private static final long serialVersionUID = 1L;

	private String username;
	private String password;
	private boolean enabled = false;
	private List<GrantedAuthority> authorities;

	public MyUserDetails(User user) {

		this.username = user.getUsername();
		this.password = user.getPassword();
		this.enabled = user.isEnabled();

		// Granted Authorities -> permissions as a user (which endpoints can we access)
		// -> can find our GA based on what the user's roles are
		this.authorities = Arrays.asList(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	/*
	 * All Methods After Here:
	 * - DON'T NEED to store this type of info in the user table
	 * - store this info if its worthwhile for your security
	 * - have these methods return true manually if you don't need to store info
	 * about them
	 * for your security
	 */

	// accounts can expire b/c temporary accounts
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	// lock an account b/c a person guessed the wrong pw too many times
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	// credentials are no longer valid b/c you have to set a new pw every couple
	// months
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	// enabled -> can't/can use this account
	@Override
	public boolean isEnabled() {
		return enabled;
	}

}
