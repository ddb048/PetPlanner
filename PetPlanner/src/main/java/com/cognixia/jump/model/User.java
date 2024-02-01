package com.cognixia.jump.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.swagger.v3.oas.annotations.media.Schema;

@Entity
@Table(name = "users")
@Schema(description = "Represents a user in the system")
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    public static enum Role {
        ROLE_USER, ROLE_ADMIN
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique identifier of the User")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Schema(description = "Role of the User in the system")
    private Role role;

    @NotBlank(message = "Username is required")
    @Size(min = 4, max = 20, message = "Username must be between 4 and 20 characters")
    @Column(unique = true)
    @Schema(description = "Username of the User")
    private String username;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must have at least 6 characters")
    @Schema(description = "Password for the User account")
    private String password;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Column(unique = true)
    @Schema(description = "Email address of the User")
    private String email;

    @Column(columnDefinition = "boolean default false")
    @Schema(description = "Status to indicate if the User account is enabled")
    private boolean enabled;

    @Schema(description = "Profile picture URL of the User")
    private String profilePic;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
	private List<Pet> pets;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
   	private List<Event> events;

    public User() {

    }

    public User(Long id, Role role,
			@NotBlank(message = "Username is required") @Size(min = 4, max = 20, message = "Username must be between 4 and 20 characters") String username,
			@NotBlank(message = "Password is required") @Size(min = 6, message = "Password must have at least 6 characters") String password,
			@NotBlank(message = "Email is required") @Email(message = "Email should be valid") String email,
			boolean enabled, String profilePic, List<Pet> pets, List<Event> events) {
		super();
		this.id = id;
		this.role = role;
		this.username = username;
		this.password = password;
		this.email = email;
		this.enabled = enabled;
		this.profilePic = profilePic;
		this.pets = pets;
		this.events = events;
	}



	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }

    public List<Pet> getPets() {
		return pets;
	}



	public void setPets(List<Pet> pets) {
		this.pets = pets;
	}



	public List<Event> getEvents() {
		return events;
	}



	public void setEvents(List<Event> events) {
		this.events = events;
	}



	public Role getRole() {
        return this.role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }


	@Override
	public String toString() {
		return "User [id=" + id + ", role=" + role + ", username=" + username + ", password=" + password + ", email="
				+ email + ", enabled=" + enabled + ", profilePic=" + profilePic + ", pets=" + pets + ", events="
				+ events + "]";
	}



}
