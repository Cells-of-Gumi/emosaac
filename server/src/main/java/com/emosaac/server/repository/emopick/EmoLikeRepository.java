package com.emosaac.server.repository.emopick;

import com.emosaac.server.domain.emo.LikeEmo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface EmoLikeRepository extends JpaRepository<LikeEmo, Long> {
    @Query("select l from LikeEmo l where l.emopick.EmopickId = :emopickId and l.user.userId = :userId")
    Optional<LikeEmo> existsByEmopickIdAndUserId(@Param("emopickId") Long emopickId, @Param("userId") Long userId);

}
