package com.cognixia.jump.model;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.persistence.*;

@Entity
@Table(name = "events")
public class Event implements Serializable {
	
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date date;
	
	@Temporal(TemporalType.TIME)
	private Date duration;
	
	@NotNull
	private String address;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "OrganizerId")
	private User organizer;
	
	@Column(length=500)
	private String description;
	
	@ManyToMany
    @JoinTable(
        name = "PetsEvents",
        joinColumns = @JoinColumn(name = "EventId"),
        inverseJoinColumns = @JoinColumn(name = "PetId")
    )
    private Set<Pet> pets = new HashSet<>();

	public Event()
	{
		
	}
	
	public Event(Long id, Date date, Date duration, String address, User organizer, String description, Set<Pet> pets) {
		super();
		this.id = id;
		this.date = date;
		this.duration = duration;
		this.address = address;
		this.organizer = organizer;
		this.description = description;
		this.pets = pets;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Date getDuration() {
		return duration;
	}

	public void setDuration(Date duration) {
		this.duration = duration;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public User getOrganizer() {
		return organizer;
	}

	public void setOrganizer(User organizer) {
		this.organizer = organizer;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Set<Pet> getPets() {
		return pets;
	}

	public void setPets(Set<Pet> pets) {
		this.pets = pets;
	}

	@Override
	public String toString() {
		return "Event [id=" + id + ", date=" + date + ", duration=" + duration + ", address=" + address + ", organizer="
				+ organizer + ", description=" + description + ", pets=" + pets + "]";
	}
	

}
