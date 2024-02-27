package com.springboot.luanvan.payload.request;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

public class CartRequest {
	
	@NotNull
	private Long user_id;

	@NotNull
	private Long book_id;

	@NotNull
	@Min(1)
	private int quantity;
	

	public CartRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CartRequest(@NotNull Long user_id, @NotNull Long book_id, @NotNull @Min(1) int quantity) {
		super();

		this.user_id = user_id;
		this.book_id = book_id;
		this.quantity = quantity;
	}

	public Long getUser_id() {
		return user_id;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}

	public Long getBook_id() {
		return book_id;
	}

	public void setBook_id(Long book_id) {
		this.book_id = book_id;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
}
