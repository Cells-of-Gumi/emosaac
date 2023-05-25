package com.emosaac.server.repository.emopick;

import com.emosaac.server.domain.emo.EmopickDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EmopickDetailRepository extends JpaRepository<EmopickDetail, Long> {

    @Query("select d from Emopick e join EmopickDetail d on e.EmopickId = d.emopick.EmopickId where d.book.bookId = :bookId and d.emopick.EmopickId = :emopickId")
    EmopickDetail findByEmopickIdAndBookId(Long emopickId, Long bookId);

    @Modifying
    @Query("delete from EmopickDetail d where d.emopick.EmopickId = :emopickId")
    void deleteByEmopickId(Long emopickId);
}
