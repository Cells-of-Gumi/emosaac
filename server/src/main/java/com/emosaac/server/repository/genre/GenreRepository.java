package com.emosaac.server.repository.genre;

import com.emosaac.server.domain.book.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Long> {
    @Query("select g from Genre g where  g.gerneId = :genreId")
    Optional<Genre> findById(@Param("genreId") Integer genreId);

    @Query("select g from Genre g where substring(g.gerneId, 1, 1) = '1'")
    List<Genre> findWebtoon();

}
