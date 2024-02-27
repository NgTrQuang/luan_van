package com.springboot.luanvan.security.services;

import java.util.List;

import org.springframework.stereotype.Component;

import com.springboot.luanvan.models.Address;
import com.springboot.luanvan.models.User;
import com.springboot.luanvan.payload.request.AddressRequest;


@Component
public interface AddressService {

	List<Address> getAllAddressByUser(Long userId);

	Address findAddressById(Long addressId);

	void hardDeleteAddressById(Long addressId);

	void softDeleteAddressById(Long addressId);

	User createAddress(AddressRequest addressRequest);

	User updateAddress(Long addressId, AddressRequest addressRequest);
}
