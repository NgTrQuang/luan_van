package com.springboot.luanvan.payload.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.springboot.luanvan.models.Image;

public class UserInformationRequest {
	@NotBlank
	@Size(min = 2, max = 10)
	private String firstname;

	@NotBlank
	@Size(min = 2, max = 10)
	private String lastname;

//	@NotBlank
//	@Size(max = 50)
//	@Email
//	private String email;

//	private Long userProfile_id;

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

//	public String getEmail() {
//		return email;
//	}
//
//	public void setEmail(String email) {
//		this.email = email;
//	}
//
//	public Long getUserProfile_id() {
//		return userProfile_id;
//	}
//
//	public void setUserProfile_id(Long userProfile_id) {
//		this.userProfile_id = userProfile_id;
//	}
}
