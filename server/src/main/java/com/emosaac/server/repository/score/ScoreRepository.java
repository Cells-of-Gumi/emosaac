package com.emosaac.server.repository.score;

import com.emosaac.server.domain.book.Score;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ScoreRepository extends JpaRepository<Score, Long> {

}
