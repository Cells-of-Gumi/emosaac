package com.emosaac.server.repository.bookmark;

import com.emosaac.server.domain.book.BookMark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<BookMark, Long> {
    @Query("select b from BookMark b where b.book.bookId = :bookId and b.user.userId = :userId")
    Optional<BookMark> existsByBookIdAndUserId(@Param("bookId") Long bookId, @Param("userId") Long userId);
}
