package com.cognixia.jump.model;

import java.io.Serializable;

// HTTP response object for when a user authenticates and gets a JWT
// response we're getting at endpoint http://localhost:8080/authenticate

public class AuthenticationResponse implements Serializable {

	private static final long serialVersionUID = 1L;

	
	private String jwt;
	
	public AuthenticationResponse(String jwt) {
		this.jwt = jwt;
	}

	public String getJwt() {
		return jwt;
	}

	public void setJwt(String jwt) {
		this.jwt = jwt;
	}
	
}
