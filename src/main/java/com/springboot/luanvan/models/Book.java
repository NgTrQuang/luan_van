package com.springboot.luanvan.models;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
//sự xuất hiện của các đối tượng Proxy 
//khi cố gắng chuyển đổi các đối tượng sang định dạng JSON các thư viện chuyển đổi sẽ gặp khó khăn trong việc xử lý các đối tượng Proxy.
@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long bookId;

    @Column(name = "name", nullable = false, unique = true)
    @NotBlank(message = "Tên không được để trống")
    @Length(min = 3, message = "Tên phải có ít nhất 3 kí tự")
    private String bookName;
    
    @NotBlank(message = "Mô tả là bắt buộc")
	private String description;

    @Column(name = "price")
    @NotNull
    @Min(0)
    private int price;
    
    @Column(name = "stock")
    @NotNull
    @Min(0)
    private int stock;

    @Column(name = "sell")
    @Min(0)
    private int sell;
//    @Column(name = "image")
//    private String imageUrl;
    
    @NotNull
    @Column(name = "status")
    private boolean status;
    
    public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}
	
	@Column(name = "cover_image") // ảnh tượng trưng cho mỗi quyển sách
	private String coverImage;

	public String getCoverImage() {
		return coverImage;
	}

	public void setCoverImage(String coverImage) {
		this.coverImage = coverImage;
	}

	public Book() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Book(Long bookId,
			@NotBlank(message = "Tên không được để trống") @Length(min = 3, message = "Tên phải có ít nhất 3 kí tự") String bookName,
			@NotBlank(message = "Mô tả là bắt buộc") String description, @NotNull @Min(0) int price,
			@NotNull @Min(0) int stock, @Min(0) int sell, @NotNull boolean status, String coverImage, Set<Author> authors,
			Set<Genre> genres, PublishingPlace publishingPlace, List<Image> images) {
		super();
		this.bookId = bookId;
		this.bookName = bookName;
		this.description = description;
		this.price = price;
		this.stock = stock;
		this.sell = 0;
		this.status = status;
		this.coverImage = coverImage;
		this.authors = authors;
		this.genres = genres;
		this.publishingPlace = publishingPlace;
		this.images = images;
	}

//	public Book(
//			@NotBlank(message = "Tên không được để trống") @Length(min = 3, message = "Tên phải có ít nhất 3 kí tự") String bookName,
//			@NotBlank(message = "Mô tả là bắt buộc") String description, @NotNull @Min(0) int price,
//			@NotNull @Min(0) int stock) {
//		super();
//		this.bookName = bookName;
//		this.description = description;
//		this.price = price;
//		this.stock = stock;
////		this.imageUrl = imageUrl;
//		this.status = false;
//	}

	
	public Long getBookId() {
		return bookId;
	}

	public void setBookId(Long bookId) {
		this.bookId = bookId;
	}

	public String getBookName() {
		return bookName;
	}

	public void setBookName(String bookName) {
		this.bookName = bookName;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getStock() {
		return stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}	
	
	public int getSell() {
		return sell;
	}

	public void setSell(int sell) {
		this.sell = sell;
	}

	//	@JsonIgnore
	@ManyToMany(mappedBy = "books", fetch = FetchType.LAZY) // mappedBy định nghĩa cho lớp không là "chủ"
	@JsonIgnoreProperties("books")
	private Set<Author> authors = new HashSet<>();
	
	public Set<Author> getAuthors() {
		return authors;
	}

	public void setAuthors(Set<Author> authors) {
		this.authors = authors;
	}
	
//	// Thêm tác giả cho sách
//    public void addAuthor(Author author) {
//        this.authors.add(author);
//        author.getBooks().add(this);
//    }
//
//    // Xóa tác giả khỏi sách
//    public void removeAuthor(Author author) {
//        this.authors.remove(author);
//        author.getBooks().remove(this);
//    }
//	@JsonIgnore
	@ManyToMany(mappedBy = "books", fetch = FetchType.LAZY)
	@JsonIgnoreProperties("books")
	private Set<Genre> genres = new HashSet<>();
	
	public Set<Genre> getGenres() {
		return genres;
	}

	public void setGenres(Set<Genre> genres) {
		this.genres = genres;
	}
	
//	// Thêm thể loại cho sách
//    public void addGenre(Genre genre) {
//        this.genres.add(genre);
//        genre.getBooks().add(this);
//    }
//
//    // Xóa thể loại khỏi sách
//    public void removeGenre(Genre genre) {
//        this.genres.remove(genre);
//        genre.getBooks().remove(this);
//    }
	
//	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "publishingplace_id")
//	@JsonBackReference 
	//được đặt trên phía "one". Annotation này cho biết đối tượng hiện tại là "back reference"
	//và sẽ không được serialize/deserialize. Thay vào đó, nó sẽ được tham chiếu tới đối tượng "managed side" 
	//và serialize/deserialize thông qua đối tượng đó.
	private PublishingPlace publishingPlace;
	
	public PublishingPlace getPublishingPlace() {
		return publishingPlace;
	}

	public void setPublishingPlace(PublishingPlace publishingPlace) {
		this.publishingPlace = publishingPlace;
	}

//	@JsonIgnore
	//Quan hệ 1 nhiều với hình ảnh
    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
//    @JsonIgnoreProperties("book")
    private List<Image> images = new ArrayList<>();

	public List<Image> getImages() {
		return images;
	}	

	public void setImages(List<Image> images) {
		this.images = images;
	}	
}
