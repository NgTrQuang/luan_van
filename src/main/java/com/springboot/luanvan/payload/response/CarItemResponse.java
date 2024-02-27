package com.springboot.luanvan.payload.response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Errors;

import com.springboot.luanvan.models.Book;
import com.springboot.luanvan.models.CartItem;


public class CarItemResponse {
	@Autowired CartItem items;
	@Autowired Book books;
	public Errors errors;
	public String message;
	
	public CarItemResponse(CartItem items,Book books, Errors errors, String message) {
		super();
		this.items = items;
		this.books = books;
		this.errors = errors;
		this.message = message;
	}

	public CartItem getItems() {
		return items;
	}

	public void setItems(CartItem items) {
		this.items = items;
	}

	public Errors getErrors() {
		return errors;
	}

	public void setErrors(Errors errors) {
		this.errors = errors;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Book getBooks() {
		return books;
	}

	public void setBooks(Book books) {
		this.books = books;
	}
}
