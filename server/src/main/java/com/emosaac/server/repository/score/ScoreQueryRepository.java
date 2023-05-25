package com.emosaac.server.repository.score;

import com.emosaac.server.domain.book.Score;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import static com.emosaac.server.domain.book.QScore.score1;

@RequiredArgsConstructor
@Repository
public class ScoreQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public Score findScoreByBookIdAndUserId(Long bookId, Long userId){
        return jpaQueryFactory.select(score1)
                .from(score1)
                .where(
                    score1.book.bookId.eq(bookId),
                    score1.user.userId.eq(userId)
                )
                .fetchOne();
    }
}
