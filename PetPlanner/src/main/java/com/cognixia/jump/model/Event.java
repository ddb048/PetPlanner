package com.cognixia.jump.model;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "events")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Event implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Temporal(TemporalType.TIMESTAMP)
	private Date date;

	@NotNull
	private String eventName;
	
	@NotNull
	private String eventPictureUrl;
	
	
	private Integer duration;

	@NotNull
	private String address;

	@ManyToOne
	@JoinColumn( name = "user_id", referencedColumnName = "id" ) // can add nullable = false to make sure dorm id is given for each account (won't b/c we may have commuter students)
	private User user;

	@Column(length = 500)
	private String description;

	@ManyToMany
	@JoinTable(name = "PetsEvents", joinColumns = @JoinColumn(name = "EventId"), inverseJoinColumns = @JoinColumn(name = "PetId"))
	private Set<Pet> pets = new HashSet<>();

	public Event() {

	}

	

	public Event(Long id, Date date, @NotNull String eventName, @NotNull String eventPictureUrl, Integer duration,
			@NotNull String address, User user, String description, Set<Pet> pets) {
		super();
		this.id = id;
		this.date = date;
		this.eventName = eventName;
		this.eventPictureUrl = eventPictureUrl;
		this.duration = duration;
		this.address = address;
		this.user = user;
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

	public Integer getDuration() {
		return duration;
	}

	public void setDuration(Integer duration) {
		this.duration = duration;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
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

	

	public String getEventName() {
		return eventName;
	}



	public void setEventName(String eventName) {
		this.eventName = eventName;
	}



	public String getEventPictureUrl() {
		return eventPictureUrl;
	}



	public void setEventPictureUrl(String eventPictureUrl) {
		this.eventPictureUrl = eventPictureUrl;
	}



	@Override
	public String toString() {
		return "Event [id=" + id + ", date=" + date + ", eventName=" + eventName + ", eventPictureUrl="
				+ eventPictureUrl + ", duration=" + duration + ", address=" + address + ", user=" + user
				+ ", description=" + description + ", pets=" + pets + "]";
	}

	

	

}