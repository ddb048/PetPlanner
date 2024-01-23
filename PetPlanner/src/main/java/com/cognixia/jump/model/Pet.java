package com.cognixia.jump.model;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "pets")
public class Pet implements Serializable {

	private static final long serialVersionUID = 1L;
	public enum Species {
		DOG, CAT, BIRD, FISH, REPTILE, OTHER
	}

	public enum Temperament {
		FRIENDLY, RESERVED, AGGRESSIVE, PLAYFUL, CALM
	}
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotNull
	private String petName;

	@ManyToOne
	@JoinColumn( name = "user_id", referencedColumnName = "id" ) // can add nullable = false to make sure dorm id is given for each account (won't b/c we may have commuter students)
	private User user;

	@NotNull
	@Enumerated(EnumType.STRING)
	private Species species;

	private String petPicture;

	@Temporal(TemporalType.DATE)
	private Date birthdate;

	@NotNull
	@Enumerated(EnumType.STRING)
	private Temperament temparement;

	@Column(length = 500)
	private String description;

	@JsonIgnore
	@ManyToMany(mappedBy = "pets")
	private Set<Event> events = new HashSet<>();

	public Pet() {

	}
	
	public Pet(Long id, @NotNull String petName, User user, @NotNull Species species, String petPicture, Date birthdate,
			@NotNull Temperament temparement, String description, Set<Event> events) {
		super();
		this.id = id;
		this.petName = petName;
		this.user = user;
		this.species = species;
		this.petPicture = petPicture;
		this.birthdate = birthdate;
		this.temparement = temparement;
		this.description = description;
		this.events = events;
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Set<Event> getEvents() {
		return events;
	}

	public void setEvents(Set<Event> events) {
		this.events = events;
	}

	public Species getSpecies() {
		return species;
	}

	public void setSpecies(Species species) {
		this.species = species;
	}

	public String getPetPicture() {
		return petPicture;
	}

	public void setPetPicture(String petPicture) {
		this.petPicture = petPicture;
	}

	public Date getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(Date birthdate) {
		this.birthdate = birthdate;
	}

	public Temperament getTemparement() {
		return temparement;
	}

	public void setTemparement(Temperament temparement) {
		this.temparement = temparement;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	public String getPetName() {
		return petName;
	}

	public void setPetName(String petName) {
		this.petName = petName;
	}

	@Override
	public String toString() {
		return "Pet [id=" + id + ", petName=" + petName + ", user=" + user + ", species=" + species + ", petPicture="
				+ petPicture + ", birthdate=" + birthdate + ", temparement=" + temparement + ", description="
				+ description + ", events=" + events + "]";
	}
	

}