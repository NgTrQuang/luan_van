package com.springboot.luanvan.models;

import java.util.List;

//import java.util.ArrayList;
//import java.util.Iterator;
//import java.util.List;

//import javax.persistence.CascadeType;
import javax.persistence.Entity;
//import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
//import javax.persistence.OneToMany;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

//import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class PublishingPlace {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	private Long id;
	private String name;
	private String address;
	private String holine;

	public PublishingPlace() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PublishingPlace(String name, String address, String holine) {
		super();
		this.name = name;
		this.address = address;
		this.holine = holine;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getHoline() {
		return holine;
	}

	public void setHoline(String holine) {
		this.holine = holine;
	}

//	public List<Book> getBooks_pp() {
//		return books_pp;
//	}
//
//	public void setBooks_pp(List<Book> books_pp) {
//		this.books_pp = books_pp;
//	}	
	
//	@OneToMany(cascade = CascadeType.ALL, mappedBy = "publisingPlace", orphanRemoval = true)
////	@JsonManagedReference 
//	//được đặt trên phía "many" của mối quan hệ giữa hai đối tượng.
//	//Annotation này cho biết đối tượng hiện tại là "managed side" và sẽ được serialize/deserialize.
//	private List<Book> books_pp = new ArrayList<>();
	
	@OneToMany(mappedBy = "publishingPlace")
//    @JsonIgnoreProperties("publishingPlace")
    private List<Book> books;

	
//	public void addBook(Book book) {
//		this.books_pp.add(book);
//		book.setPublisingPlace(this);
//	}
//	
//	public void removeBook(Book book) {
//		book.setPublisingPlace(null);
//		this.books_pp.remove(book);
//	}
//	
//	public void removeBooks() {
//		Iterator<Book> iterator = this.books_pp.iterator();
//		
//		while (iterator.hasNext()) {
//			Book book = iterator.next();
//			
//			book.setPublisingPlace(null);
//			iterator.remove();
//		}
//	}
}
