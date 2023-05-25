package com.emosaac.server.repository.book;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.emosaac.server.domain.book.Book;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    @Query(value = "SELECT * FROM book b WHERE b.type_cd = :typeCd AND b.title LIKE %:str%", nativeQuery = true)
    List<Book> findBookname(@Param("typeCd") int typeCd, @Param("str") String str);
}
