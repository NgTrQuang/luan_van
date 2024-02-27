package com.springboot.luanvan.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.luanvan.models.Author;
import com.springboot.luanvan.models.Book;
import com.springboot.luanvan.repository.AuthorRepository;
import com.springboot.luanvan.repository.BookRepository;

@Service
public class AuthorService {

	@Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private BookRepository bookRepository;

    public void addBookToAuthor(Long authorId, Long bookId) {
        Author author = authorRepository.findById(authorId).orElse(null);
        Book book = bookRepository.findById(bookId).orElse(null);
        if (author != null && book != null) {
            author.getBooks().add(book);
            book.getAuthors().add(author);
            authorRepository.save(author);
        }
    }

    public void removeBookFromAuthor(Long authorId, Long bookId) {
        Author author = authorRepository.findById(authorId).orElse(null);
    }
}
