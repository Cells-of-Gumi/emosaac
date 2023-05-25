package com.emosaac.server.repository.readbook;

import com.emosaac.server.domain.book.ReadBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ReadRepository extends JpaRepository<ReadBook, Long> {
    @Query("select r from ReadBook r where r.book.bookId = :bookId and r.user.userId = :userId")
    Optional<Object> existsByBookIdAndUserId(Long bookId, Long userId);
}
