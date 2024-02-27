package com.springboot.luanvan.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
//import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
//import java.util.stream.Collectors;

import javax.management.RuntimeErrorException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.luanvan.exception.ResourceNotFoundException;
import com.springboot.luanvan.models.Book;
import com.springboot.luanvan.models.Author;
import com.springboot.luanvan.models.Genre;
import com.springboot.luanvan.models.Image;
import com.springboot.luanvan.models.PublishingPlace;
import com.springboot.luanvan.payload.request.BookRequest;
import com.springboot.luanvan.repository.BookRepository;
import com.springboot.luanvan.repository.AuthorRepository;
import com.springboot.luanvan.repository.GenreRepository;
import com.springboot.luanvan.repository.ImageRepository;
import com.springboot.luanvan.repository.PublishingPlaceRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api/v1")
public class BookController {
	public static String UPLOAD_DIRECTORY = System.getProperty("user.dir") + "/src/main/resources/static/img";
	@Autowired
	private final BookRepository bookRepository;
	@Autowired
	private final ImageRepository imageRepository;
	@Autowired
	private final PublishingPlaceRepository publishingPlaceRepository;
	@Autowired
	private final AuthorRepository authorRepository;
	@Autowired
	private final GenreRepository genreRepository;
	@Autowired
		public BookController(
				BookRepository bookRepository,
				ImageRepository imageRepository,
				PublishingPlaceRepository publishingPlaceRepository,
				AuthorRepository authorRepository, 
				GenreRepository genreRepository) {
		super();
		this.bookRepository = bookRepository;
		this.imageRepository = imageRepository;
		this.publishingPlaceRepository = publishingPlaceRepository;
		this.authorRepository = authorRepository;
		this.genreRepository = genreRepository;
	}

		//get all book
		@GetMapping("/books")
//		@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
//		@PreAuthorize("hasRole('ROLE_ADMIN')") 
		public  ResponseEntity<Page<Book>> getAllBooks(	@RequestParam(defaultValue = "0") int page,
                										@RequestParam(defaultValue = "4") int size,
                										@RequestParam(defaultValue = "false") boolean status) {
//			List<Book> books;
//				books = bookRepository.findByStatus(false);
			Page<Book> booksToPage = bookRepository.findAllByOrderByCreatedAtDesc(PageRequest.of(page, size), status);
			System.out.println("======TEST book=====> book = " + booksToPage);
//			System.out.println("status from bookcontroller 2 " + );
			return ResponseEntity.ok(booksToPage);
		}
		
		@PostMapping("/books")
		@PreAuthorize("hasRole('ROLE_ADMIN')")
//		@PreAuthorize("hasRole('ROLE_ADMIN')")
		public ResponseEntity<Book> createBook(@RequestBody BookRequest bookRequest){
			Book book = new Book();
			book.setBookName(bookRequest.getBookName());
			book.setDescription(bookRequest.getDescription());
			book.setPrice(bookRequest.getPrice());
			book.setStock(bookRequest.getStock());
			book.setStatus(false);
			//thiết lập nhà xuất bản
			PublishingPlace publishingPlace = publishingPlaceRepository.findById(Long.valueOf(bookRequest.getPublishingPlaceId()))
		            .orElseThrow(() -> new RuntimeException("Nhà xuất bản không tồn tại"));
		    book.setPublishingPlace(publishingPlace);
		    //thiết lập tác giả
		    Set<Author> authors = new HashSet<>(authorRepository.findAllByIdIn(bookRequest.getAuthorIds()));
//		    book.setAuthors(authors);
//		    book.getAuthors().clear(); // Xóa hết danh sách tác giả cũ của quyển sách nếu cần
		    for (Author author : authors) {
		        author.addBook(book); // Thêm tác giả mới vào danh sách tác giả của quyển sách
		    }

		    //thiết lập thể loại
		    Set<Genre> genres = new HashSet<>(genreRepository.findAllByIdIn(bookRequest.getGenreIds()));
//		    book.setGenres(genres);
		    for (Genre genre : genres) {
		    	genre.addBook(book);
		    }
		    
		    for (Long imageName : bookRequest.getImageNamesList()) {
		        Image image = imageRepository.findByIdImage(imageName);
		        if (image != null) {
		            image.setBook(book);			// nếu sách phía sau được tạo và nhận ảnh này lần nữa nó sẽ thay thế cho sách cũ và trở thành ảnh cho sách mới
		            imageRepository.save(image); // Lưu hình ảnh cụ thể
		        }
		    }			
//			return ResponseEntity.ok("Sách đã được tạo!");
			return ResponseEntity.ok(book);
		}
		
		//get book by id rest api
		@GetMapping("/books/{id}")
//		@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
//		@PreAuthorize("hasRole('ROLE_ADMIN')") 
		public ResponseEntity<Book> getBookById(@PathVariable Long id) {
			Book book = bookRepository.findById(id)
					.orElseThrow(()-> new ResourceNotFoundException("Book not exist with id: " + id));
//			book.setCoverImage(UPLOAD_DIRECTORY +"/"+ book.getCoverImage());
			//xây dựng đường dẫn tương đối
//			for(Image image : book.getImages()) {
//				image.setPathImage(UPLOAD_DIRECTORY +"/"+ image.getPathImage());
//			}
			
			return ResponseEntity.ok(book);
		}
		
		@PutMapping("/books/{id}")
		@PreAuthorize("hasRole('ROLE_ADMIN')")
		public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody BookRequest bookRequest) {
		    // Tìm sách theo ID hoặc trả về lỗi nếu không tìm thấy
		    Book book = bookRepository.findById(id)
		            .orElseThrow(() -> new RuntimeException("Không tìm thấy sách với ID: " + id));

		    // Cập nhật thông tin sách với dữ liệu mới từ bookRequest
		    book.setBookName(bookRequest.getBookName());
		    book.setDescription(bookRequest.getDescription());
		    book.setPrice(bookRequest.getPrice());
		    book.setStock(bookRequest.getStock());

		    // Cập nhật nhà xuất bản (nếu cần)
		    PublishingPlace publishingPlace = publishingPlaceRepository.findById(Long.valueOf(bookRequest.getPublishingPlaceId()))
		            .orElseThrow(() -> new RuntimeException("Nhà xuất bản không tồn tại"));
		    book.setPublishingPlace(publishingPlace);

		    // Cập nhật danh sách tác giả
		    Set<Author> authors = new HashSet<>(authorRepository.findAllByIdIn(bookRequest.getAuthorIds()));
		    book.getAuthors().clear(); // Xóa hết danh sách tác giả cũ của quyển sách
		    
		    // Lấy danh sách tác giả cũ của quyển sách
		    Set<Author> authorsToDelete = new HashSet<>(authorRepository.findAllByBooks(book));

		    // Xóa quan hệ nhiều-nhiều trong bảng dữ liệu trung gian
		    for (Author author : authorsToDelete) {
		        author.removeBook(book); // Loại bỏ quyển sách khỏi danh sách tác giả của tác giả
		    }

		    // Lưu thay đổi vào cơ sở dữ liệu
		    authorRepository.saveAll(authorsToDelete);
		    for (Author author : authors) {
		        author.addBook(book); // Thêm tác giả mới vào danh sách tác giả của quyển sách
		    }

		    // Cập nhật danh sách thể loại
		    Set<Genre> genres = new HashSet<>(genreRepository.findAllByIdIn(bookRequest.getGenreIds()));
		    book.getGenres().clear(); // Xóa hết danh sách thể loại cũ của quyển sách
		    
		    // Lấy danh sách thể loại cũ của quyển sách
		    Set<Genre> genresToDelete = new HashSet<>(genreRepository.findAllByBooks(book));

		    // Xóa quan hệ nhiều-nhiều trong bảng dữ liệu trung gian
		    for (Genre genre : genresToDelete) {
		        genre.removeBook(book); // Loại bỏ quyển sách khỏi danh sách thể loại của quyển sách
		    }
		    
		    for (Genre genre : genres) {
		        genre.addBook(book); // Thêm thể loại mới vào danh sách thể loại của quyển sách
		    }
		    
		    // Xóa quan hệ ảnh cũ
//		    book.getImages().clear();
		    // Cập nhật thêm danh sách hình ảnh
		    for (Long imageName : bookRequest.getImageNamesList()) {
		        Image image = imageRepository.findByIdImage(imageName);
		        if (image != null) {
		            image.setBook(book); // Thiết lập sách cho hình ảnh
		            imageRepository.save(image); // Lưu hình ảnh cụ thể
		        }
		    }

		    // Lưu sách đã cập nhật vào cơ sở dữ liệu
		    Book updatedBook = bookRepository.save(book);

		    return ResponseEntity.ok(updatedBook);
		}

		
		@PutMapping("/books/delete/{id}")
		@PreAuthorize("hasRole('ROLE_ADMIN')")
//		@PreAuthorize("hasRole('ROLE_ADMIN')") 
		public ResponseEntity<Map<String, Boolean>> deleteBookByStatus(@PathVariable Long id){
//			Book book = bookRepository.findById(id)
//					.orElseThrow(()-> new ResourceNotFoundException("Book not exist with id: " + id));
//			book.setStatus(true);
			bookRepository.deleteByIdAndUpdateStatus(id);
			Map<String, Boolean> response = new HashMap<>();
			response.put("deleted", Boolean.TRUE);
			return ResponseEntity.ok(response);
		}
		
		@DeleteMapping("/books/{id}")
		@PreAuthorize("hasRole('ROLE_ADMIN')")
	    public ResponseEntity<String> deleteBook(@PathVariable Long id) {
	        try {
	            // Kiểm tra xem cuốn sách có tồn tại hay không
	            Book book = bookRepository.findById(id).orElse(null);
	            if (book == null) {
	                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy sách với ID: " + id);
	            }
	            // Cập nhật nhà xuất bản (nếu cần)
			    book.setPublishingPlace(null);

			    book.getAuthors().clear(); // Xóa hết danh sách tác giả cũ của quyển sách
			    
			    // Lấy danh sách tác giả cũ của quyển sách
			    Set<Author> authorsToDelete = new HashSet<>(authorRepository.findAllByBooks(book));

			    // Xóa quan hệ nhiều-nhiều trong bảng dữ liệu trung gian
			    for (Author author : authorsToDelete) {
			        author.removeBook(book); // Loại bỏ quyển sách khỏi danh sách tác giả của tác giả
			    }

			    book.getGenres().clear(); // Xóa hết danh sách thể loại cũ của quyển sách
			    
			    // Lấy danh sách tác giả cũ của quyển sách
			    Set<Genre> genresToDelete = new HashSet<>(genreRepository.findAllByBooks(book));

			    // Xóa quan hệ nhiều-nhiều trong bảng dữ liệu trung gian
			    for (Genre genre : genresToDelete) {
			        genre.removeBook(book); // Loại bỏ quyển sách khỏi danh sách tác giả của tác giả
			    }
			    
			    // Xóa quan hệ ảnh cũ
			    book.getImages().clear();
			    // Cập nhật lại quyển sách sau khi thay đổi trở nên rỗng các quan hệ
			    Book updatedBook = bookRepository.save(book);
	            
	            // Xóa sách cuối cùng, sẽ tự động xóa tất cả các quan hệ qua Cascade
	            bookRepository.deleteById(id);

	            return ResponseEntity.ok("Đã xóa sách với ID: " + id);
	            
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Lỗi khi xóa sách: " + e.getMessage());
	        }
	    }
		
		//Thong ke
	    private int calculateTotalSell(List<Book> books) {
	        int totalSell = 0;

	        for (Book book : books) {
	            totalSell += book.getSell();
	        }

	        return totalSell;
	    }
		
		@GetMapping("/books/sell-statistics")
		@PreAuthorize("hasRole('ROLE_ADMIN')")
	    public ResponseEntity<?> getSellStatistics() {
	        try {
	            List<Book> books = bookRepository.findAll();
	            int totalSell = calculateTotalSell(books);

	            return ResponseEntity.ok(totalSell);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi xử lý yêu cầu");
	        }
	    }
	    
	    @GetMapping("/books/all-statistics")
	    @PreAuthorize("hasRole('ROLE_ADMIN')")
	    public ResponseEntity<?> getAllStatistics() {
	        try {
	            List<Book> books = bookRepository.findAll();
	            int total = 0;
	            
	            for (Book book : books) {
		            total += book.getStock();
		        }

	            return ResponseEntity.ok(total);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi xử lý yêu cầu");
	        }
	    }
	    
	 // Trong BookController.java

	    @GetMapping("/books/best-selling-books")
	    @PreAuthorize("hasRole('ROLE_ADMIN')")
	    public ResponseEntity<List<Book>> getBestSellingBooks() {
	        try {
	            List<Book> bestSellingBooks = bookRepository.findTop5ByOrderBySellDesc();
	            return ResponseEntity.ok(bestSellingBooks);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	        }
	    }
}
