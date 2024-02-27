package com.springboot.luanvan.payload.request;

public class CartItemToInvoiceRequest {

	private Long book_id; // Thay thế "book" bằng "book_id"
    
	private int quantity;

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
