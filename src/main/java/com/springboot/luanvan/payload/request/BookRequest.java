package com.springboot.luanvan.payload.request;

import java.util.List;
import java.util.Set;

public class BookRequest {
	private String bookName;
	private String description;
	private int price;
	private int stock;
	private boolean status;
	private Set<Long> genreIds;
	private Set<Long> authorIds;
	private int publishingPlaceId;
	private List<Long> imageNamesList;
	
	
	public String getBookName() {
		return bookName;
	}
	
	public void setBookName(String bookName) {
		this.bookName = bookName;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public int getPrice() {
		return price;
	}
	
	public void setPrice(int price) {
		this.price = price;
	}
	
	public int getStock() {
		return stock;
	}
	
	public void setStock(int stock) {
		this.stock = stock;
	}
	
	public boolean isStatus() {
		return status;
	}
	
	public void setStatus(boolean status) {
		this.status = status;
	}
	
	public Set<Long> getGenreIds() {
		return genreIds;
	}
	
	public void setGenreIds(Set<Long> genreIds) {
		this.genreIds = genreIds;
	}
	
	public Set<Long> getAuthorIds() {
		return authorIds;
	}
	
	public void setAuthorIds(Set<Long> authorIds) {
		this.authorIds = authorIds;
	}

	public int getPublishingPlaceId() {
		return publishingPlaceId;
	}

	public void setPublishingPlaceId(int publishingPlaceId) {
		this.publishingPlaceId = publishingPlaceId;
	}

	public List<Long> getImageNamesList() {
		return imageNamesList;
	}
	
	public void setImageNamesList(List<Long> imageNamesList) {
		this.imageNamesList = imageNamesList;
	}
	
}
