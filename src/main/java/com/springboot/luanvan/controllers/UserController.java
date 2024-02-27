package com.springboot.luanvan.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.config.authentication.UserServiceBeanDefinitionParser;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.luanvan.models.User;
import com.springboot.luanvan.payload.request.AddressRequest;
import com.springboot.luanvan.payload.request.PasswordRequest;
import com.springboot.luanvan.payload.request.UserAvatarRequest;
import com.springboot.luanvan.payload.request.UserInformationRequest;
import com.springboot.luanvan.payload.response.MessageResponse;
import com.springboot.luanvan.repository.UserRepository;
import com.springboot.luanvan.security.services.UserService;


@CrossOrigin(origins = "http://localhost:8081", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {
	@Autowired UserRepository userRepository;
	@Autowired UserService userService;
	@GetMapping("/getAll")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
//	@PreAuthorize("hasRole('CRUD_ALLOW_ALL')")
	public ResponseEntity<?> getAllUser() {
		try {
			List<User> listUsers = userService.getAll();
			return ResponseEntity.ok(listUsers);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/{userId}")
//	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
//	@PreAuthorize("hasRole('USER_NORMAL_ACCESS')")
	public ResponseEntity<?> getUser(@PathVariable("userId") Long userId) {
		try {
			User user = userService.findUserById(userId);
			return ResponseEntity.ok(user);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping(value = "/updateUserInformation/{userId}", consumes = { "*/*" })
//	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
//	@PreAuthorize("hasRole('USER_NORMAL_ACCESS')")
	public ResponseEntity<?> updateUserInformation(@PathVariable("userId") Long userId,
			@RequestBody @Valid UserInformationRequest userInformationRequest) {
		return new ResponseEntity<>(userService.updateUserInformation(userId, userInformationRequest), HttpStatus.CREATED);
	}
	
	@PutMapping(value = "/updateUserAvatar/{userId}")
//	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
//	@PreAuthorize("hasRole('USER_NORMAL_ACCESS')")
	public ResponseEntity<?> updateUserAvatar(@PathVariable("userId") Long userId,
			@RequestBody @Valid Long userAvatarId) {
		return new ResponseEntity<>(userService.updateUserAvatar(userId, userAvatarId), HttpStatus.CREATED);
	}
	
	@PutMapping(value = "/updatePassword/{userId}", consumes = { "*/*" })
//	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
//	@PreAuthorize("hasRole('USER_NORMAL_ACCESS')")
	public ResponseEntity<?> updatePassword(@PathVariable("userId") Long userId,
			@RequestBody @Valid PasswordRequest passwordRequest) {
		if(passwordRequest.getPassword().equals(passwordRequest.getCheckPassword())) {
			return new ResponseEntity<>(userService.updatePassword(userId, passwordRequest), HttpStatus.CREATED);
		} else {
			return ResponseEntity.badRequest()
					.body(new MessageResponse("Lỗi: password và checkPassword nhập vào không giống nhau!"));
		}
	}
	
	@PutMapping(value = "/updateAddress/{addressId}", consumes = { "*/*" })
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
//	@PreAuthorize("hasRole('ADDRESS_NORMAL_ACCESS')")
	public ResponseEntity<?> updateAddress(@PathVariable("addressId") Long addressId,
			@RequestBody @Valid AddressRequest addressRequest) {
		return new ResponseEntity<>(userService.updateAddress(addressId, addressRequest), HttpStatus.CREATED);
	}
	
	@DeleteMapping(value = "/{userId}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
//	@PreAuthorize("hasRole('USER_NORMAL_ACCESS')")
	public ResponseEntity<MessageResponse> softDeleteUser(@PathVariable("userId") Long userId) {
		try {
			userService.softDeleteUser(userId);
			return ResponseEntity.ok(new MessageResponse("Dữ liệu đã bị ngắt kết nối (soft_delete)!"));
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@DeleteMapping(value = "/delete/{userId}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
//	@PreAuthorize("hasRole('CRUD_ALLOW_ALL')")
	public ResponseEntity<MessageResponse> hardDeleteUser(@PathVariable("userId") Long userId) {
		try {
			userService.hardDeleteUser(userId);
			return ResponseEntity.ok(new MessageResponse("Đã xóa dữ liệu thành công trong CSDL!"));
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping(value = "/reactivation/{userId}", consumes = { "*/*" })
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
//	@PreAuthorize("hasRole('CRUD_ALLOW_ALL')")
	public ResponseEntity<?> userReactivationById(@PathVariable("userId") Long userId) {
		return new ResponseEntity<>(userService.userReactivationById(userId), HttpStatus.CREATED);
	}
	
	//Thong ke
	// So luong nguoi dung
	@GetMapping("/count")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Long> countUsers() {
        Long count = userRepository.countUsers();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }
}
