package com.springboot.luanvan.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.springboot.luanvan.models.Book;

import java.util.List;
//import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
	@Query(value="SELECT * FROM books WHERE name LIKE BINARY CONCAT('%',:text,'%')", nativeQuery = true)
	List<Book> findByNameLike(@Param("text") String text);
	
	boolean existsByBookName(String name);	
	
	List<Book> findByStatus(Boolean status);
	
	Optional<Book> findById(Long id);
//	@Query(value = "SELECT book.id, book.name, author.id, author.name FROM book JOIN author_book ON book.id = author_book.book_id JOIN author ON author_book.author_id = author.id", nativeQuery = true)
//	List<Book> findBooks();
	
	@Transactional
    @Modifying
    @Query(value = "UPDATE books SET status = true WHERE id = :bookId", nativeQuery = true)
    void deleteByIdAndUpdateStatus(@Param("bookId") Long id);
	
    List<Book> findAll();
    
    @Query("SELECT b FROM Book b WHERE b.status = ?1")
    Page<Book> findAllByOrderByCreatedAtDesc(Pageable pageable, Boolean status);
//    List<Book> findByPriceContaining(String price);
    
    boolean existsById(Long id);
    
    // Lấy danh sách 5 quyển sách có số lượng bán cao nhất
    List<Book> findTop5ByOrderBySellDesc();
}
