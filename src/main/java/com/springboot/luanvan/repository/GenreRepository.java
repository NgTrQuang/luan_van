package com.springboot.luanvan.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.springboot.luanvan.models.Author;
import com.springboot.luanvan.models.Book;
import com.springboot.luanvan.models.Genre;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Long> {
	Optional<Genre> findById(Long id);
    List<Genre> findAll();
    Set<Genre> findAllByIdIn(Set<Long> ids);
    Set<Genre> findAllByBooks(Book book);
    
    @Query("SELECT COUNT(g) FROM Genre g")
    Long countGenres();
    
    @Query("SELECT g.name, COUNT(b) FROM Genre g JOIN g.books b GROUP BY g.name")
    List<Object[]> countBooksByGenre();
}
