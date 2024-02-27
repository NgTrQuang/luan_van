package com.springboot.luanvan.repository;

import java.util.List;
import java.util.Optional;
//import java.util.Set;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.springboot.luanvan.models.Author;
import com.springboot.luanvan.models.Book;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long>{
	Optional<Author> findById(Long id);
    List<Author> findAll();
    Set<Author> findAllByIdIn(Set<Long> ids);
    Set<Author> findAllByBooks(Book book);
    
    @Query("SELECT COUNT(a) FROM Author a")
    Long countAuthors();
    
    @Query("SELECT a.name, COUNT(b) FROM Author a JOIN a.books b GROUP BY a.name")
    List<Object[]> countBooksByAuthor();
}
