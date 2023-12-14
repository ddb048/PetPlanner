package com.cognixia.jump.model;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "pets")
public class Pet implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ownerId")
	@JsonBackReference
	private User owner;

	@NotBlank
	@Enumerated(EnumType.STRING)
	private Species species;

	private String petPicture;

	@Temporal(TemporalType.DATE)
	private Date birthdate;

	@NotBlank
	@Enumerated(EnumType.STRING)
	private Temperament temparement;

	@Column(length = 500)
	private String description;

	@ManyToMany(mappedBy = "pets")
	private Set<Event> events = new HashSet<>();

	public Pet() {

	}

	public Pet(Long id, User ownerId, @NotBlank Species species, String petPicture, Date birthdate,
			@NotBlank Temperament temparement, String description, Set<Event> events) {
		super();
		this.id = id;
		this.owner = ownerId;
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

	public User getOwnerId() {
		return owner;
	}

	public void setOwnerId(User owner) {
		this.owner = owner;
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

	public enum Species {
		DOG, CAT, BIRD, FISH, REPTILE, OTHER
	}

	public enum Temperament {
		FRIENDLY, RESERVED, AGGRESSIVE, PLAYFUL, CALM
	}

	@Override
	public String toString() {
		return "Pet [id=" + id + ", species=" + species + ", petPicture=" + petPicture +
				", birthdate=" + birthdate + ", temperament=" + temparement +
				", description=" + description + "]";
	}

}
