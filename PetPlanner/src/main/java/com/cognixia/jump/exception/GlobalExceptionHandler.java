package com.cognixia.jump.exception;

import java.util.Date;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

// @ControllerAdvice -> advice all controllers in this app on what to do when certain exception are thrown

@ControllerAdvice
public class GlobalExceptionHandler {
	
	//handles methodArgumentNotValidException
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> methodArgumentNotValid( MethodArgumentNotValidException ex, WebRequest request ) {

		// The following will find all the error messages that were found when
		// validating the fields in the request and formatting our message so it can be passed
		// within our response
		StringBuilder errors = new StringBuilder("");
		for (FieldError fe : ex.getBindingResult().getFieldErrors()) {
			errors.append("[" + fe.getField() + " : " + fe.getDefaultMessage() + "]; ");
		}

		// request.getDescription() -> details on the request (usually just includes the uri/url )
		ErrorDetails errorDetails = new ErrorDetails(new Date(), errors.toString(), request.getDescription(false));

		// give a general 400 status code to indicate error on client end
		return ResponseEntity.status(400).body(errorDetails);
	}
	
	//handles resourceNotFoundException
		@ExceptionHandler(ResourceNotFoundException.class)
		public ResponseEntity<?> resourceNotFound(ResourceNotFoundException ex, WebRequest request) {
			
			ErrorDetails errorDetails = new ErrorDetails(new Date(), ex.getMessage(), request.getDescription(false));
			
			return ResponseEntity.status(404).body(errorDetails);
		}

	
	
}