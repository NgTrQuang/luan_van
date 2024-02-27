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

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "genres")
public class Genre {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "name", nullable = false, unique = true)
    @Length(min = 3, message = "*Name must have at least 3 characters")
	private String name;
	
	public Genre() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Genre(String name, Set<Book> books) {
		super();
		this.name = name;
		this.books = books;
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

	@ManyToMany (cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
	@JoinTable(	name = "genre_book", 
				joinColumns= @JoinColumn(name = "genre_id"), 
				inverseJoinColumns = @JoinColumn(name = "book_id"))
//	@JsonManagedReference
	private Set<Book> books = new HashSet<>();

	public Set<Book> getBooks() {
		return books;
	}

	public void setBooks(Set<Book> books) {
		this.books = books;
	}
	
	public void addBook(Book book) {
		this.books.add(book);
		book.getGenres().add(this);
	}

	public void removeBook(Book book) {
		this.books.remove(book);
		book.getGenres().remove(this);
	}
	
	public void removeBooks() {
		Iterator<Book> iterator = this.books.iterator();
		while (iterator.hasNext()) {
			Book book = iterator.next();
			book.getGenres().remove(this);
			iterator.remove();
		}
	}
	
}
