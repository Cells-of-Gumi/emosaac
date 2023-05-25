package com.emosaac.server.service;

import com.emosaac.server.common.exception.ResourceNotFoundException;
import com.emosaac.server.domain.book.Book;
import com.emosaac.server.domain.book.Genre;
import com.emosaac.server.domain.user.User;
import com.emosaac.server.repository.book.BookQueryRepository;
import com.emosaac.server.repository.genre.GenreRepository;
import com.emosaac.server.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommonService {

    private final BookQueryRepository bookQueryRepository;
    private final UserRepository userRepository;
    private final GenreRepository genreRepository;

    public Book getBook(Long bookId){
        Book book = bookQueryRepository.findBookByBook(bookId).orElseThrow(() -> new ResourceNotFoundException("Book", "bookId", bookId));

        return book;
    }

    public User getUser(Long userId){
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("user", "userId", userId));

        return user;
    }

    public Genre getGenre(Long genreId){
        Genre genre = genreRepository.findById(genreId).orElseThrow(() -> new ResourceNotFoundException("GenreResponse", "genreId", genreId));
        return genre;
    }
}
