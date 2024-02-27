package com.springboot.luanvan.security.services;

import java.util.List;

import com.springboot.luanvan.models.User;
import com.springboot.luanvan.payload.request.AddressRequest;
import com.springboot.luanvan.payload.request.PasswordRequest;
import com.springboot.luanvan.payload.request.UserAvatarRequest;
import com.springboot.luanvan.payload.request.UserInformationRequest;

public interface UserService {
	List<User> getAll();
	
	void softDeleteUser(Long UserId);
	
	void hardDeleteUser(Long UserId);
	
	User findUserById(Long userId);
	
	User updateUserAvatar(Long userId, Long userAvatarId);

	User updateUserInformation(Long userId, UserInformationRequest userInformationRequest);

	User updatePassword(Long userId, PasswordRequest passwordRequest);
	
	User updateAddress(Long addressId, AddressRequest addressRequest);

	User userReactivationById(Long userId);
}
