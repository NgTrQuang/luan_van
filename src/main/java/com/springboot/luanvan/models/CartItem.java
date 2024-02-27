package com.springboot.luanvan.models;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class CartItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long cartItemId;

	@JoinColumn(name = "user_id")
	@ManyToOne
//	@JsonBackReference
	private User user;

	@JoinColumn(name = "book_id")
	@ManyToOne
//	@JsonBackReference
	private Book book;

	@JoinColumn(name = "invoice_id")
	@ManyToOne
	@JsonIgnore
//	@JsonBackReference
	private Invoice invoice;

	@NotNull
	@Min(0)
	private int quantity;

	@NotNull
	private boolean statusPay;

	public CartItem() {
		super();
	}

	public CartItem(User user, Book book, @NotNull @Min(0) int quantity) {
		super();
		this.user = user;
		this.book = book;
		this.quantity = quantity;
		this.statusPay = false;
	}

	public Long getCartItemId() {
		return cartItemId;
	}

	public void setCartItemId(Long cartItemId) {
		this.cartItemId = cartItemId;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Book getBook() {
		return book;
	}

	public void setBook(Book book) {
		this.book = book;
	}

	public Invoice getInvoice() {
		return invoice;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public void setInvoice(Invoice invoice) {
		this.invoice = invoice;
	}

	public boolean getStatusPay() {
		return statusPay;
	}

	public void setStatusPay(boolean statusPay) {
		this.statusPay = statusPay;
	}
}
