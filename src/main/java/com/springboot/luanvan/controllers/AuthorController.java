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
import com.springboot.luanvan.models.Author;
import com.springboot.luanvan.repository.AuthorRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api/authors")
public class AuthorController {
	
	AuthorRepository authorRepository;
	@Autowired
		public AuthorController(AuthorRepository authorRepository) {
		super();
		this.authorRepository = authorRepository;
	}

		//get all author
		@GetMapping("/")
//		@PreAuthorize("hasRole('ROLE_ADMIN')") 
		public  ResponseEntity<?> getAllAuthors() {
			List<Author> authors = authorRepository.findAll();
			System.out.println("======TEST author=====> author = " + authors);
			return ResponseEntity.ok(authors);
		}
		
		//create author rest api
		@PostMapping("/")
//		@PreAuthorize("hasRole('ROLE_ADMIN')") 
		public Author createAuthor(@RequestBody Author author) {
			return authorRepository.save(author);
		}
		
		//get author by id rest api
		@GetMapping("/{id}")
//		@PreAuthorize("hasRole('ROLE_ADMIN')") 
		public ResponseEntity<Author> getAuthorById(@PathVariable Long id) {
			Author author = authorRepository.findById(id)
					.orElseThrow(()-> new ResourceNotFoundException("Author not exist with id: " + id));
			return ResponseEntity.ok(author);
		}
		
		//update author rest api
		@PutMapping("/{id}")
//		@PreAuthorize("hasRole('ROLE_ADMIN')") 
		public ResponseEntity<Author> updateAuthor(@PathVariable Long id, @RequestBody Author authorDetails) {
			Author author = authorRepository.findById(id)
					.orElseThrow(()-> new ResourceNotFoundException("Author not exist with id: " + id));
			author.setName(authorDetails.getName());
			author.setYearOfBirth(authorDetails.getYearOfBirth());
			
			Author updatedAuthor = authorRepository.save(author);
			return ResponseEntity.ok(updatedAuthor);
		}
		
		@DeleteMapping("/{id}")
//		@PreAuthorize("hasRole('ROLE_ADMIN')") 
		public ResponseEntity<Map<String, Boolean>> deleteAuthor(@PathVariable Long id){
			Author author = authorRepository.findById(id)
					.orElseThrow(()-> new ResourceNotFoundException("Author not exist with id: " + id));
			authorRepository.delete(author);
			Map<String, Boolean> response = new HashMap<>();
			response.put("deleted", Boolean.TRUE);
			return ResponseEntity.ok(response);
		}
		
		// Thống kê số lượng tác giả
		@GetMapping("/count")
		public ResponseEntity<Long> countAuthors() {
		    Long count = authorRepository.countAuthors();
		    return new ResponseEntity<>(count, HttpStatus.OK);
		}

		// Số lượng sách của từng tác giả
		@GetMapping("/countBooks")
		public ResponseEntity<List<Object[]>> countBooksByAuthor() {
		    List<Object[]> result = authorRepository.countBooksByAuthor();
		    return new ResponseEntity<>(result, HttpStatus.OK);
		}

}
