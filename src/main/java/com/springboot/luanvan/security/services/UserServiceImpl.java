package com.springboot.luanvan.security.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.source.InvalidConfigurationPropertyValueException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.springboot.luanvan.models.Address;
import com.springboot.luanvan.models.Image;
import com.springboot.luanvan.models.User;
import com.springboot.luanvan.payload.request.AddressRequest;
import com.springboot.luanvan.payload.request.PasswordRequest;
import com.springboot.luanvan.payload.request.UserAvatarRequest;
import com.springboot.luanvan.payload.request.UserInformationRequest;
import com.springboot.luanvan.repository.AddressRepository;
import com.springboot.luanvan.repository.ImageRepository;
import com.springboot.luanvan.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{
	@Autowired
	UserRepository userRepository;
	@Autowired
	PasswordEncoder encoder;
	@Autowired
	ImageRepository imageRepository;
	@Autowired
	AddressRepository addressRepository;

	@Override
	public List<User> getAll() {
		return userRepository.findAll();
	}

	@Override
	public User findUserById(Long userId) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new InvalidConfigurationPropertyValueException("UserId", userId, "Not found"));
		return user;
	}

	@Override
	public void softDeleteUser(Long userId) {
		User user = userRepository.findById(userId).orElseThrow();
		if (user.getUserId().equals(userId)) {
			user.setStatus(false);
			userRepository.save(user);
		} else
			throw new InvalidConfigurationPropertyValueException("userId", userId, "Not found");
	}

	@Override
	public void hardDeleteUser(Long userId) {
		if (userRepository.findById(userId).get().getUserId().equals(userId)) {
			userRepository.deleteById(userId);
		} else
			throw new InvalidConfigurationPropertyValueException("userId", userId, "Not found");
	}

	@Override
	public User updateUserInformation(Long userId, UserInformationRequest userInformationRequest) {
		User user = userRepository.findById(userId).orElseThrow();
		if (user != null) {
			user.setFirstname(userInformationRequest.getFirstname());
			user.setLastname(userInformationRequest.getLastname());
//			user.setEmail(userInformationRequest.getEmail());
//			Image profileImage = imageRepository.findById(userInformationRequest.getUserProfile_id()).orElse(null);
//			user.setProfileImage(userInformationRequest.getUserProfile_id());
//			user.setProfileImage(profileImage);
		} else {
			throw new InvalidConfigurationPropertyValueException("user", user, "Not found");
		}
		return userRepository.save(user);
	}
	
	@Override
	public User updateUserAvatar(Long userId, Long userAvatarId) { //UserAvatarRequest userAvatarRequest
	    User user = userRepository.findById(userId).orElseThrow();
	    if (user != null) {
//	    	Long newProfileImageId = userAvatarRequest.getProfileImageId();
	        Image profileImage = imageRepository.findById(userAvatarId).orElse(null);
	        if(userAvatarId != null) {
	        	user.setProfileImage(profileImage);
	        	return userRepository.save(user);
	        }else {
	            throw new InvalidConfigurationPropertyValueException("profileImageId", userAvatarId, "Not found");
	        }
	    } else {
	        throw new InvalidConfigurationPropertyValueException("user", user, "Not found");
	    }
	}

	@Override
	public User updatePassword(Long userId, PasswordRequest passwordRequest) {
		User user = userRepository.findById(userId).orElseThrow();
		if (!user.equals(null)) {
			user.setPassword(encoder.encode(passwordRequest.getPassword()));
		} else {
			throw new InvalidConfigurationPropertyValueException("user", user, "Not found");
		}
		return userRepository.save(user);
	}

	@Override
	public User updateAddress(Long addressId, AddressRequest addressRequest) {
		Address address = addressRepository.findById(addressId)
				.orElseThrow(() -> new InvalidConfigurationPropertyValueException("addressId", addressId, "Not found"));
		if (address != null) {
//			Ward ward = wardRepository.findById(addressRequest.getWard_id())
//					.orElseThrow(() -> new InvalidConfigurationPropertyValueException("Ward_id",
//							addressRequest.getWard_id(), "Not found"));
//			District district = districtRepository.findById(addressRequest.getDistrict_id())
//					.orElseThrow(() -> new InvalidConfigurationPropertyValueException("District_id",
//							addressRequest.getDistrict_id(), "Not found"));
//			City city = cityRepository.findById(addressRequest.getCity_id())
//					.orElseThrow(() -> new InvalidConfigurationPropertyValueException("City_id",
//							addressRequest.getCity_id(), "Not found"));

			address.setAddress(addressRequest.getAddressName());
			address.setPhone(addressRequest.getPhone());
			address.setFulladdress(addressRequest.getFullAddress());
//			address.setDistrict(district);
//			address.setWard(ward);
//			address.setCity(city);
			addressRepository.save(address);

		} else {
			throw new InvalidConfigurationPropertyValueException("addressId", addressId, "Not found");
		}

		return address.getUser();
	}
	
	@Override
	public User userReactivationById(Long userId) {
		User user = userRepository.findById(userId).orElseThrow(
				() -> new InvalidConfigurationPropertyValueException("userId", userId, "Not found"));
		user.setStatus(true);
		return userRepository.save(user);
	}
}
