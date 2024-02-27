package com.springboot.luanvan.models;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "authors")
public class Author {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "name", nullable = false, unique = true)
    @Length(min = 3, message = "*Name must have at least 3 characters")
	private String name;
//	private String picture;
	@Column(name = "yearBirth", nullable = true)
	private Integer yearOfBirth;

	public Author() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Author(String name, int yearOfBirth) {
		super();
		this.name = name;
//		this.picture = picture;
		this.yearOfBirth = yearOfBirth;
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

//	public String getPicture() {
//		return picture;
//	}
//
//	public void setPicture(String picture) {
//		this.picture = picture;
//	}

	public Integer getYearOfBirth() {
		return yearOfBirth;
	}

	public void setYearOfBirth(Integer yearOfBirth) {
		this.yearOfBirth = yearOfBirth;
	}

	public Set<Book> getBooks() {
		return books;
	}

	public void setBooks(Set<Book> books) {
		this.books = books;
	}
		
	@ManyToMany (cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
	@JoinTable(	name = "author_book", 
				joinColumns= @JoinColumn(name = "author_id"), 
				inverseJoinColumns = @JoinColumn(name = "book_id"))
	private Set<Book> books = new HashSet<>();
	
	public void addBook(Book book) {
		this.books.add(book);
		book.getAuthors().add(this);
	}

	public void removeBook(Book book) {
		this.books.remove(book);
		book.getAuthors().remove(this);
	}
	
	public void removeBooks() {
		Iterator<Book> iterator = this.books.iterator();
		while (iterator.hasNext()) {
			Book book = iterator.next();
			book.getAuthors().remove(this);
			iterator.remove();
		}
	}	
}
