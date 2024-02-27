package com.springboot.luanvan.models;

//import java.time.LocalDateTime;

import javax.persistence.*;
//
import com.fasterxml.jackson.annotation.JsonBackReference;
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "images")
public class Image {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idImage", nullable = false)
    private Long idImage;

    @Column(name = "nameImage")
    private String nameImage;

//    @Column(name = "type")
//    private String type;

//    @Lob // Large Object
//    @Column(name = "data", columnDefinition = "LONGBLOB")
//    private byte[] data;
    @Column(name = "pathImage")
    private String pathImage;

//    @Column(name = "created_at")
//    private LocalDateTime createdAt;
//
//    @PrePersist
//    public void prePersist() {
//        createdAt = LocalDateTime.now();
//    }
    
    //Quan hệ nhiều 1 với hình ảnh
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id") // Tên cột khóa ngoại trong bảng "images"
    @JsonBackReference
    private Book book;
    
    public Book getBook() {
		return book;
	}

	public void setBook(Book book) {
		this.book = book;
	}

	public Image() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getIdImage() {
		return idImage;
	}

	public String getNameImage() {
		return nameImage;
	}

	public void setNameImage(String nameImage) {
		this.nameImage = nameImage;
	}

	public String getPathImage() {
		return pathImage;
	}

	public void setPathImage(String pathImage) {
		this.pathImage = pathImage;
	}

	public void setIdImage(Long idImage) {
		this.idImage = idImage;
	}

	//xóa hình ảnh đảm bảo toàn vẹn dữ liệu quan hệ
    public void removeBook(Book book) {
    	this.book = null;
    }
}
