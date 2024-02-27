package com.springboot.luanvan.payload.request;

import java.util.List;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.springboot.luanvan.models.CartItem;

public class InvoiceRequest {
	@NotNull
	private Long user_id;
	
	@NotNull
	private Long address_id;

	@NotNull
	private List<CartItem> cartItems; // Danh sách các sản phẩm mà người dùng muốn mua

	public InvoiceRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	public InvoiceRequest(@NotNull Long user_id, @NotNull Long address_id, @NotNull List<CartItem> cartItems) {
		super();
		this.user_id = user_id;
		this.address_id = address_id;
		this.cartItems = cartItems;
	}
	public List<CartItem> getCartItems() {
		return cartItems;
	}

	public void setCartItems(List<CartItem> cartItems) {
		this.cartItems = cartItems;
	}

	public Long getUser_id() {
		return user_id;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}

	public Long getAddress_id() {
		return address_id;
	}

	public void setAddress_id(Long address_id) {
		this.address_id = address_id;
	}
}
