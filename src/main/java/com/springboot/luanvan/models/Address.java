package com.springboot.luanvan.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Address {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long addressId;
	
	@NotNull
	private String address;
	
//	@NotNull
	private String phone;
	
	private String fulladdress;
	
	public String getFulladdress() {
		return fulladdress;
	}

	public void setFulladdress(String fulladdress) {
		this.fulladdress = fulladdress;
	}

	//	@NotNull
	private boolean status;

//	@JsonIgnore
	@JoinColumn(name = "ward_id")
	@ManyToOne
	private Ward ward;
	
//	@JsonIgnore
	@JoinColumn(name = "district_id")
	@ManyToOne
	private District district;
	
//	@JsonIgnore
	@JoinColumn(name = "city_id")
	@ManyToOne
	private City city;
	
	@JoinColumn(name = "user_id")
	@ManyToOne
	@JsonIgnore
//	@JsonBackReference
	private User user;
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "address", orphanRemoval = true)
//	@JsonIgnoreProperties("address")
	@JsonIgnore
//    @JsonManagedReference
	private List<Invoice> invoices = new ArrayList<>();
		
	public Address() {
		super();
	}

	public Address(@NotNull String address, String phone, String fulladdress, boolean status, Ward ward,
			District district, City city, User user, List<Invoice> invoices) {
		super();
		this.address = address;
		this.phone = phone;
		this.status = status;
		this.ward = ward;
		this.district = district;
		this.city = city;
		this.user = user;
		this.fulladdress = fulladdress;
		this.invoices = invoices;
	}

	public Address(@NotNull String address, String phone, String fulladdress, User user) {
		super();
		this.address = address;
		this.phone = phone;
		this.user = user;
		this.fulladdress = fulladdress;
	}

	public List<Invoice> getInvoices() {
		return invoices;
	}

	public void setInvoices(List<Invoice> invoices) {
		this.invoices = invoices;
	}

	public Long getAddressId() {
		return addressId;
	}

	public void setAddressId(Long addressId) {
		this.addressId = addressId;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public Ward getWard() {
		return ward;
	}

	public void setWard(Ward ward) {
		this.ward = ward;
	}

	public District getDistrict() {
		return district;
	}

	public void setDistrict(District district) {
		this.district = district;
	}

	public City getCity() {
		return city;
	}

	public void setCity(City city) {
		this.city = city;
	}
}
