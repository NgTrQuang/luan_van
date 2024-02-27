package com.springboot.luanvan.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.luanvan.models.ERole;
import com.springboot.luanvan.models.Role;
import com.springboot.luanvan.models.User;
import com.springboot.luanvan.payload.request.LoginRequest;
import com.springboot.luanvan.payload.request.SignupRequest;
import com.springboot.luanvan.payload.response.JwtResponse;
import com.springboot.luanvan.payload.response.MessageResponse;
import com.springboot.luanvan.repository.RoleRepository;
import com.springboot.luanvan.repository.UserRepository;
import com.springboot.luanvan.security.jwt.JwtUtils;
import com.springboot.luanvan.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired AuthenticationManager authenticationManager;   //Spring sec API
  @Autowired UserRepository userRepository;
  @Autowired RoleRepository roleRepository;
  @Autowired PasswordEncoder encoder;
  @Autowired JwtUtils jwtUtils;

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
  System.out.println("======TEST 1=====> jwt = "+authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);
//    System.out.println("======TEST 1=====> jwt = "+jwt);
       
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();    
    System.out.println("======TEST 1=====> jwt = "+userDetails.getFirstname());
    ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);
    
//    String firtname = userDetails.getFirstname();
//    String lastname = userDetails.getLastname();
    
    List<String> privileges = userDetails.getAuthorities().stream()
        .map(item -> item.getAuthority())
        .collect(Collectors.toList());   
//    System.out.println("======TEST 2=====> roles = "+roles);
//    User user = new User(userDetails);
    
    return ResponseEntity.ok()
			.body(new JwtResponse(jwt, userDetails.getId(), 
    		userDetails.getUsername(), userDetails.getEmail(), privileges, userDetails.getFirstname(), userDetails.getLastname()));
    
//    .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
	  
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      return ResponseEntity.badRequest()
          .body(new MessageResponse("Lỗi: Tên đăng nhập này đã tồn tại!"));
    }
    
    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity.badRequest()
          .body(new MessageResponse("Lỗi: Tên email này đã tồn tại!"));
    }
    
    // Create new user's account
    User user = new User(signUpRequest.getFirstname(), signUpRequest.getLastname(), signUpRequest.getUsername(), signUpRequest.getEmail(),
               encoder.encode(signUpRequest.getPassword()));
    
    Set<String> strRoles = signUpRequest.getRoles();
    Set<Role> roles = new HashSet<>();
    
    if (strRoles == null) {
      Role userRole = roleRepository.findByName(ERole.ROLE_USER)
          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(userRole);
    } else {
      strRoles.forEach(role -> {
        switch (role) {
        case "admin":
          Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(adminRole);
          break;
          
        case "mod":
          Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(modRole);
          break;
          
        case "user":
			Role userRole1 = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole1);
			break;
          
        default:
          Role userRole = roleRepository.findByName(ERole.ROLE_USER)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(userRole);
        }
      });
    }
    
    user.setRoles(roles);
    userRepository.save(user);
    
    return ResponseEntity.ok(new MessageResponse("Bạn đã đăng kí thành công!"));
  }
  
  @PostMapping("/signout")
	public ResponseEntity<?> logoutUser() {
		ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
		return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
				.body(new MessageResponse("You've been signed out!"));
	}
}


