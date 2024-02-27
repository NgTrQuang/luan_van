package com.springboot.luanvan.models;
import java.time.LocalDateTime;

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
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Invoice {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long invoiceId;
	
	@JoinColumn(name = "user_id")
	@ManyToOne
//	@JsonBackReference 
	private User user;
	
	@NotNull
	private LocalDateTime timeCreate;
	
	private LocalDateTime receivedTime;
	
	@NotNull
	private String paymentMethod;
	
	@NotNull
	@Min(0)
	private double totalPrice;
	
//	@NotNull
	private String wasPay = "Chưa thanh toán";
	
	@NotNull
	private String action = "Đang xử lý";
	
//	@NotNull
	private boolean status;
	
//	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "invoice", orphanRemoval = true)
//	@JsonIgnoreProperties("invoice")
	private List<CartItem> cartItems = new ArrayList<>();
		
//	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "address_id")
//	@JsonBackReference

	private Address address;

	public Invoice() {
	}
	
//	public Invoice(User user, @NotNull String timeCreate, @NotNull String paymentMethod,
//			@NotNull @Min(0) double totalPrice, @NotNull boolean wasPay, List<CartItem> cartItems, Address address) {
//		super();
//		this.user = user;
////		this.timeCreate = timeCreate;
//		this.paymentMethod = paymentMethod;
//		this.totalPrice = totalPrice;
//		this.wasPay = wasPay;
//		this.cartItems = cartItems;
//		this.address = address;
//		this.wasPay = false;
//		this.status = true;
//		this.timeCreate = "Chưa thanh toán";
//	}
	

	public Long getInvoiceId() {
		return invoiceId;
	}

	public Invoice(User user, @NotNull String paymentMethod,
			@NotNull @Min(0) double totalPrice, String wasPay, boolean status, String action,
			Address address) {
			super();
			this.user = user;
			this.timeCreate = LocalDateTime.now();
			this.paymentMethod = paymentMethod;
			this.totalPrice = totalPrice;
			this.wasPay = "Chưa thanh toán";
			this.status = true;
			this.action = "Đang xử lý";
			this.address = address;
	}
	
	public Invoice(User user, @NotNull String paymentMethod,
		@NotNull @Min(0) double totalPrice, String wasPay, boolean status, String action, List<CartItem> cartItems,
		Address address) {
		super();
		this.user = user;
		this.timeCreate = LocalDateTime.now();
		this.paymentMethod = paymentMethod;
		this.totalPrice = totalPrice;
		this.wasPay = "Chưa thanh toán";
		this.status = true;
		this.action = "Đang xử lý";
		this.cartItems = cartItems;
		this.address = address;
	}

	
	public Invoice(Long invoiceId, User user, @NotNull LocalDateTime timeCreate, LocalDateTime receivedTime,
			@NotNull String paymentMethod, @NotNull @Min(0) double totalPrice, String wasPay, @NotNull String action,
			boolean status, List<CartItem> cartItems, Address address) {
		super();
		this.invoiceId = invoiceId;
		this.user = user;
		this.timeCreate = timeCreate;
		this.receivedTime = receivedTime;
		this.paymentMethod = paymentMethod;
		this.totalPrice = totalPrice;
		this.wasPay = wasPay;
		this.action = action;
		this.status = status;
		this.cartItems = cartItems;
		this.address = address;
	}

	public void setInvoiceId(Long invoiceId) {
		this.invoiceId = invoiceId;
	}

	public LocalDateTime getTimeCreate() {
		return timeCreate;
	}

	public void setTimeCreate(LocalDateTime timeCreate) {
		this.timeCreate = timeCreate;
	}

	public String getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public String getWasPay() {
		return wasPay;
	}

	public void setWasPay(String wasPay) {
		this.wasPay = wasPay;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<CartItem> getCartItems() {
		return cartItems;
	}

	public void setCartItems(List<CartItem> cartItems) {
		this.cartItems = cartItems;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public LocalDateTime getReceivedTime() {
		return receivedTime;
	}

	public void setReceivedTime(LocalDateTime receivedTime) {
		this.receivedTime = receivedTime;
	}
	
}
