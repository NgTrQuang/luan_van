package com.springboot.luanvan.controllers;


import java.util.HashMap;
import java.util.List;
import java.util.Map;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.luanvan.exception.ResourceNotFoundException;
import com.springboot.luanvan.models.Genre;
import com.springboot.luanvan.repository.GenreRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api/genres")
public class GenreController {
	
	GenreRepository genreRepository;
	@Autowired
		public GenreController(GenreRepository genreRepository) {
		super();
		this.genreRepository = genreRepository;
	}

		//get all genre
		@GetMapping("/")
//		@PreAuthorize("hasRole('ROLE_ADMIN')") 
		public  ResponseEntity<?> getAllGenres() {
			List<Genre> genres = genreRepository.findAll();
			System.out.println("======TEST genre=====> genre = " + genres);
			return ResponseEntity.ok(genres);
		}
		
		//create genre rest api
		@PostMapping("/")
//		@PreAuthorize("hasRole('ROLE_ADMIN')") 
		public Genre createGenre(@RequestBody Genre genre) {
			return genreRepository.save(genre);
		}
		
		//get genre by id rest api
		@GetMapping("/{id}")
//		@PreAuthorize("hasRole('ROLE_ADMIN')") 
		public ResponseEntity<Genre> getGenreById(@PathVariable Long id) {
			Genre genre = genreRepository.findById(id)
					.orElseThrow(()-> new ResourceNotFoundException("Genre not exist with id: " + id));
			return ResponseEntity.ok(genre);
		}
		
		//update genre rest api
		@PutMapping("/{id}")
//		@PreAuthorize("hasRole('ROLE_ADMIN')") 
		public ResponseEntity<Genre> updateGenre(@PathVariable Long id, @RequestBody Genre genreDetails) {
			Genre genre = genreRepository.findById(id)
					.orElseThrow(()-> new ResourceNotFoundException("Genre not exist with id: " + id));
			genre.setName(genreDetails.getName());
			
			Genre updatedGenre = genreRepository.save(genre);
			return ResponseEntity.ok(updatedGenre);
		}
		
		@DeleteMapping("/{id}")
//		@PreAuthorize("hasRole('ROLE_ADMIN')") 
		public ResponseEntity<Map<String, Boolean>> deleteGenre(@PathVariable Long id){
			Genre genre = genreRepository.findById(id)
					.orElseThrow(()-> new ResourceNotFoundException("Genre not exist with id: " + id));
			genreRepository.delete(genre);
			Map<String, Boolean> response = new HashMap<>();
			response.put("deleted", Boolean.TRUE);
			return ResponseEntity.ok(response);
		}
		
		//Thống kê
		// Số lượng danh mục
		@GetMapping("/count")
	    public ResponseEntity<Long> countGenres() {
	        Long count = genreRepository.countGenres();
	        return new ResponseEntity<>(count, HttpStatus.OK);
	    }
		
		// Số lượng sách trong mỗi danh mục
		@GetMapping("/countBooks")
	    public ResponseEntity<List<Object[]>> countBooksByGenre() {
	        List<Object[]> result = genreRepository.countBooksByGenre();
	        return new ResponseEntity<>(result, HttpStatus.OK);
	    }				
}
