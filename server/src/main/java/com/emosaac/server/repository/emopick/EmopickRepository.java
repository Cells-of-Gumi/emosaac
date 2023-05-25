package com.emosaac.server.repository.emopick;

import com.emosaac.server.domain.emo.Emopick;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmopickRepository extends JpaRepository<Emopick, Long> {
}
