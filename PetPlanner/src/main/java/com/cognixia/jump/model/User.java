//package com.cognixia.jump.model;
//
//import java.io.Serializable;
//
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//
////import javax.persistence.*;
////import javax.validation.constraints.Email;
////import javax.validation.constraints.NotBlank;
////import javax.validation.constraints.Size;
////
////@Entity
////@Table(name = "users")
////public class User {
////
////    @Id
////    @GeneratedValue(strategy = GenerationType.IDENTITY)
////    private Long id;
////
////    @NotBlank(message = "Username is required")
////    @Size(min = 4, max = 20, message = "Username must be between 4 and 20 characters")
////    @Column(unique = true)
////    private String username;
////
////    @NotBlank(message = "Password is required")
////    @Size(min = 6, message = "Password must have at least 6 characters")
////    private String password;
////
////    @NotBlank(message = "Email is required")
////    @Email(message = "Email should be valid")
////    @Column(unique = true)
////    private String email;
//
//
//
//@Entity
//public class User implements Serializable {
//	
//	private static final long serialVersionUID = 1L;
//	
//	@Id
//	@GeneratedValue(strategy=GenerationType.IDENTITY)
//	private Integer id;
//	
//	@Column(unique=true, nullable=false)
//	private String userName;
//	
//	@Column(nullable=false)
//	private String password;
//	
//	
//	@Column(nullable=false)
//	private String email;
//	
//	private String profilePic;
//	
//	
//	public User()
//	{
//		
//	}
//	public Integer getId() {
//		return id;
//	}
//
//	public void setId(Integer id) {
//		this.id = id;
//	}
//
//	public String getUserName() {
//		return userName;
//	}
//
//	public void setUserName(String userName) {
//		this.userName = userName;
//	}
//
//	public String getPassword() {
//		return password;
//	}
//
//	public void setPassword(String password) {
//		this.password = password;
//	}
//
//	public String getEmail() {
//		return email;
//	}
//
//	public void setEmail(String email) {
//		this.email = email;
//	}
//
//	public String getProfilePic() {
//		return profilePic;
//	}
//
//	public void setProfilePic(String profilePic) {
//		this.profilePic = profilePic;
//	}
//
//	@Override
//	public String toString() {
//		return "User [id=" + id + ", userName=" + userName + ", password=" + password + ", email=" + email
//				+ ", profilePic=" + profilePic + "]";
//	}
//	
//	
//	
//	
//	
//
//}
