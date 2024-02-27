package com.springboot.luanvan.security.services;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.springboot.luanvan.models.Privilege;
import com.springboot.luanvan.models.Role;
import com.springboot.luanvan.models.User;


public class UserDetailsImpl implements UserDetails {
  private static final long serialVersionUID = 1L;

//  private User user;
  private Long id;
  private String username;
  private String email;
  private String firstname;
  private String lastname;

  @JsonIgnore
  private String password;

  private Collection<? extends GrantedAuthority> authorities;

  public UserDetailsImpl(Long id, String username, String email, String password,
		Collection<? extends GrantedAuthority> authorities, String firstname, String lastname) {
	super();
	this.id = id;
	this.username = username;
	this.email = email;
	this.password = password;
	this.authorities = authorities;
	this.firstname = firstname;
	this.lastname = lastname;
  }

public UserDetailsImpl() {
	super();
}

public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
	this.authorities = authorities;
}

public static UserDetailsImpl build(User user) {//Set<Role>;    ERole-> name()
	Set<Role> roles = user.getRoles();
	Set<Privilege> privileges = new HashSet<>();
	
	for (Role role0 : roles) {
		Set<Privilege> privileges0 = role0.getPrivileges();
		for (Privilege privilege : privileges0) {
			privileges.add(privilege);
		}
	}
	
	List<GrantedAuthority> authorities = user.getRoles().stream()
        .map(role -> new SimpleGrantedAuthority(role.getName().name()))
        .collect(Collectors.toList());

    return new UserDetailsImpl(
        user.getUserId(),
        user.getUsername(), 
        user.getEmail(),
        user.getPassword(), 
        authorities,
        user.getFirstname(), 
        user.getLastname());
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
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


public void setId(Long id) {
	this.id = id;
}


public void setUsername(String username) {
	this.username = username;
}


public void setEmail(String email) {
	this.email = email;
}


public void setPassword(String password) {
	this.password = password;
}


public Long getId() {
    return id;
  }

  public String getEmail() {
    return email;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return username;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    UserDetailsImpl user = (UserDetailsImpl) o;
    return Objects.equals(id, user.id);
  }
}
