package com.springboot.luanvan.security.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.source.InvalidConfigurationPropertyValueException;
import org.springframework.stereotype.Service;

import com.springboot.luanvan.models.Address;
import com.springboot.luanvan.models.City;
import com.springboot.luanvan.models.District;
import com.springboot.luanvan.models.User;
import com.springboot.luanvan.models.Ward;
import com.springboot.luanvan.payload.request.AddressRequest;
import com.springboot.luanvan.repository.AddressRepository;
import com.springboot.luanvan.repository.CityRepository;
import com.springboot.luanvan.repository.DistrictRepository;
import com.springboot.luanvan.repository.UserRepository;
import com.springboot.luanvan.repository.WardRepository;

@Service
public class AddressServiceImpl implements AddressService {
	@Autowired
	UserRepository userRepository;
	@Autowired
	AddressRepository addressRepository;
	@Autowired
	WardRepository wardRepository;
	@Autowired
	DistrictRepository districtRepository;
	@Autowired
	CityRepository cityRepository;

	@Override
	public List<Address> getAllAddressByUser(Long userId) {
		return addressRepository.findByUser_UserIdAndStatus(userId, true);
	}

	@Override
	public Address findAddressById(Long addressId) {
		return addressRepository.findById(addressId).orElseThrow();
	}

	@Override
	public void hardDeleteAddressById(Long addressId) {
		if (addressRepository.findById(addressId).get().getAddressId().equals(addressId)) {
			addressRepository.deleteById(addressId);
		} else
			throw new InvalidConfigurationPropertyValueException("invoiceId", addressId, "Not Found");
	}

	@Override
	public void softDeleteAddressById(Long addressId) {
		Address address = addressRepository.findById(addressId)
				.orElseThrow(() -> new InvalidConfigurationPropertyValueException("addressId", addressId, "Not found"));
		address.setStatus(false);
		addressRepository.save(address);
	}

	@Override
	public User createAddress(AddressRequest addressRequest) {
//		Ward ward = wardRepository.findById(addressRequest.getWard_id())
//				.orElseThrow(() -> new InvalidConfigurationPropertyValueException("Ward_id",
//						addressRequest.getWard_id(), "Not found"));
//		District district = districtRepository.findById(addressRequest.getDistrict_id())
//				.orElseThrow(() -> new InvalidConfigurationPropertyValueException("District_id",
//						addressRequest.getDistrict_id(), "Not found"));
//		City city = cityRepository.findById(addressRequest.getCity_id())
//				.orElseThrow(() -> new InvalidConfigurationPropertyValueException("City_id",
//						addressRequest.getCity_id(), "Not found"));
		User user = userRepository.findById(addressRequest.getUser_id())
				.orElseThrow(() -> new InvalidConfigurationPropertyValueException("User_id",
						addressRequest.getUser_id(), "Not found"));

//		Address address = new Address(addressRequest.getAddressName(), addressRequest.getPhone(), ward, district, city,
//				user);
		String phone = addressRequest.getPhone() != null ? addressRequest.getPhone() : "N/A";
		Address address = new Address(addressRequest.getAddressName(), phone, addressRequest.getFullAddress(), user);
		
//		// Lấy danh sách địa chỉ của người dùng
//	    List<Address> userAddresses = user.getAddresses();
//
//	    // Thêm địa chỉ mới vào đầu danh sách địa chỉ
//	    userAddresses.add(0, address);
//
//	    // Cập nhật danh sách địa chỉ của người dùng
//	    user.setAddresses(userAddresses);
//
//	    // Lưu địa chỉ mới vào cơ sở dữ liệu
//	    addressRepository.save(address);

		addressRepository.save(address);
		return address.getUser();
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
}
