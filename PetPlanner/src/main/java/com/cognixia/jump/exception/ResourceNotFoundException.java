package com.cognixia.jump.exception;

//exception that is thrown when a resource cannot be found
public class ResourceNotFoundException extends Exception {

	private static final long serialVersionUID = 1L;
	
	public ResourceNotFoundException(String resource, int id) {
		
		super(resource + " with id = " + id + " was not found");
	}
	
	public ResourceNotFoundException(String resource) {
		System.out.println(resource + " could not be found");
	}
	
	public ResourceNotFoundException(String resource, String field, String value) {
		System.out.println(resource + " with " + field + " = " + value + " was not found");
	}

}