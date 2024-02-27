package com.springboot.luanvan.models;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.springboot.luanvan.security.services.UserDetailsImpl;

@Entity
@Table(name = "users", 
    uniqueConstraints = {
    	@UniqueConstraint(columnNames = "username"),
    	@UniqueConstraint(columnNames = "email") 
    })
public class User {
	@Id
  	@GeneratedValue(strategy = GenerationType.IDENTITY)
  	private Long userId;
  
  	@NotBlank
  	@Size(min = 1, max = 10)
  	private String firstname;

  	@NotBlank
  	@Size(min = 1, max = 10)
  	private String lastname;

  	@NotBlank
  	@Size(min = 3, max = 20)
  	private String username;

  	@NotBlank
  	@Size(max = 50)
  	@Email
  	private String email;

  	@NotBlank
  	@Size(max = 120)
  	private String password;

  	@ManyToMany(fetch = FetchType.LAZY)
  	@JoinTable(  name = "user_roles", 
        joinColumns = @JoinColumn(name = "user_id"), 
        inverseJoinColumns = @JoinColumn(name = "role_id"))
  	private Set<Role> roles = new HashSet<>();
  	
	public Set<Role> getRoles() {
		return roles;
	}
	
	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
  
  	private String userPhoto;
  	
  	@OneToOne
  	@JoinColumn(name = "image_id")
  	private Image profileImage;
  
  	public Image getProfileImage() {
		return profileImage;
	}

	public void setProfileImage(Image profileImage) {
		this.profileImage = profileImage;
	}

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "user", orphanRemoval = true)
//	@JsonIgnoreProperties("user")
//	@JsonManagedReference
	
  	private List<Address> addresses = new ArrayList<>();
  	
  	public List<Address> getAddresses() {
		return addresses;
	}
	
	public void setAddresses(List<Address> addresses) {
		this.addresses = addresses;
	}

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
//	@JsonManagedReference
	private List<Invoice> invoices = new ArrayList<>();
	
  	@NotNull
  	private boolean status; 	
  	
  	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

//	public User(User user) {
//  		this.userId = user.userId;
//  		this.firstname = user.firstname;
//  		this.lastname = user.lastname;
//  		this.username = user.username;
//  		this.email = user.email;
//  		this.password = user.password;
//  		this.userPhoto = user.userPhoto;
//  		this.status = user.status;
//  	}

	public User(@NotBlank @Size(min = 2, max = 10) String firstname, @NotBlank @Size(min = 2, max = 10) String lastname,
			@NotBlank @Size(max = 20) String username, @NotBlank @Size(max = 50) @Email String email,
			@NotBlank @Size(max = 120) String password) {
		super();
		this.firstname = firstname;
		this.lastname = lastname;
		this.username = username;
		this.email = email;
		this.password = password;
		this.userPhoto = null;
		this.status = true;
	}

	public User(Long userId, @NotBlank @Size(min = 2, max = 10) String firstname,
			@NotBlank @Size(min = 2, max = 10) String lastname, @NotBlank @Size(max = 20) String username,
			@NotBlank @Size(max = 50) @Email String email, @NotBlank @Size(max = 120) String password, Set<Role> roles,
			String userPhoto, List<Address> addresses, @NotNull boolean status) {
		super();
		this.userId = userId;
		this.firstname = firstname;
		this.lastname = lastname;
		this.username = username;
		this.email = email;
		this.password = password;
		this.roles = roles;
		this.userPhoto = userPhoto;
		this.addresses = addresses;
		this.status = status;
	}

	public Long getUserId() {
		return userId;
	}
	
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	
	public String getFirstname() {
		return firstname;
	}
	
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	
	public String getLastname() {
		return lastname;
	}
	
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getUserPhoto() {
		return userPhoto;
	}
	
	public void setUserPhoto(String userPhoto) {
		this.userPhoto = userPhoto;
	}
	
	public boolean isStatus() {
		return status;
	}
	
	public void setStatus(boolean status) {
		this.status = status;
	}
}
