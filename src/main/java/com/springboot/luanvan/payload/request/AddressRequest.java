package com.springboot.luanvan.payload.request;

import javax.validation.constraints.NotNull;

public class AddressRequest {
	private Long user_id;

	@NotNull
	private String addressName;

//	@NotNull
	private String phone;
	
	private String fullAddress;
	
	//	@NotNull
	private Long ward_id;

//	@NotNull
	private Long district_id;

//	@NotNull
	private Long city_id;

	public Long getUser_id() {
		return user_id;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}

	public String getAddressName() {
		return addressName;
	}

	public void setAddressName(String addressName) {
		this.addressName = addressName;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	public String getFullAddress() {
		return fullAddress;
	}

	public void setFullAddress(String fullAddress) {
		this.fullAddress = fullAddress;
	}

	public Long getWard_id() {
		return ward_id;
	}

	public void setWard_id(Long ward_id) {
		this.ward_id = ward_id;
	}

	public Long getDistrict_id() {
		return district_id;
	}

	public void setDistrict_id(Long district_id) {
		this.district_id = district_id;
	}

	public Long getCity_id() {
		return city_id;
	}

	public void setCity_id(Long city_id) {
		this.city_id = city_id;
	}

}
