package com.emosaac.server.repository.genre;

import com.emosaac.server.domain.book.Genre;
import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.book.BookListResponse;
import com.emosaac.server.dto.book.QBookListResponse;
import com.emosaac.server.dto.book.BookRequest;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringTemplate;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.emosaac.server.domain.book.QBook.book;
import static com.emosaac.server.domain.book.QGenre.genre;
import static com.emosaac.server.domain.book.QHit.hit;
import static com.emosaac.server.domain.book.QReadBook.readBook;
import static com.emosaac.server.domain.user.QResearch.research;

@RequiredArgsConstructor
@Repository

public class GenreQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    //장르 조회
    public List<Genre> findBookGenre(int typeCode) {
        return jpaQueryFactory.select(genre)
                .from(genre)
                .where(filterGenreCd(typeCode)).
                orderBy(genre.gerneId.asc()).fetch();
    }

    public List<BookListResponse> findResearch(int typeCode) {
        return jpaQueryFactory.select(new QBookListResponse(book))
                .from(research)
                .where(research.type.eq(typeCode))
                .orderBy(research.gerneId.asc())
                .fetch();
    }

    public Slice<BookListResponse> findBookListByGenre(User user, BookRequest request, PageRequest page) {

        List<BookListResponse> content = jpaQueryFactory.select(new QBookListResponse(book))
                .from(book)
                .where(book.type.eq(
                                request.getTypeCd()),
                        book.genre.gerneId.eq(request.getGenreCode()),
                        cursorIdAndCursorScore(request.getPrevId(), request.getPrevScore()),
                        notReadByUser(user.getUserId())

                )
                .limit(page.getPageSize() + 1)
                .orderBy(book.score.desc(), book.bookId.desc())
                .fetch();

        boolean hasNext = false;
        if (content.size() == page.getPageSize() + 1) {
            content.remove(page.getPageSize());
            hasNext = true;
        }

        return new SliceImpl<>(content, page, hasNext);
    }

    public Long findGenreCountByHit(Long userId, int typeCode, Long genre) {
        return jpaQueryFactory.select(hit.count())
                .from(hit).join(book).on(hit.book.bookId.eq(book.bookId))
                .where(
                        hit.user.userId.eq(userId),
                        book.type.eq(typeCode),
                        book.genre.gerneId.eq(genre)
                )
                .groupBy(book.genre.gerneId)
                .fetchOne();
    }

    //선호 장르
    public List<Genre> findBookGenreisLike(int typeCode, Long[] likeList) {
        return jpaQueryFactory.select(genre)
                .from(genre)
                .where(filterGenreCd(typeCode),
                        genre.gerneId.in(likeList)
                ).
                orderBy(genre.gerneId.asc())
                .fetch();
    }

    //선호/비선호 장르별 책
    public Slice<BookListResponse> findBookLikeGenre(Long userId, BookRequest request, PageRequest page, Long likeGenre) {

        List<BookListResponse> content = jpaQueryFactory.select(new QBookListResponse(book))
                .from(book)
                .where(book.type.eq(request.getTypeCd()),
                        book.genre.gerneId.eq(likeGenre),
                        cursorIdAndCursorScore(request.getPrevId(), request.getPrevScore()),
                        notReadByUser(userId)
                )
                .limit(page.getPageSize() + 1)
                .orderBy(book.score.desc(), book.bookId.desc())
                .fetch();

        boolean hasNext = false;
        if (content.size() == page.getPageSize() + 1) {
            content.remove(page.getPageSize());
            hasNext = true;
        }

        return new SliceImpl<>(content, page, hasNext);
    }

    //선호/비선호 장르별 책 하나만
    public List<BookListResponse> findBookLikeRandom(Long userId, int typeCd, int like, Long[] top2List) {
        return jpaQueryFactory.select(new QBookListResponse(book))
                .from(book)
                .where(book.type.eq(typeCd),
                        book.genre.gerneId.in(top2List),
                        notReadByUser(userId)
                )
                .limit(30)
                .orderBy(book.score.desc())
                .fetch();
    }


    /////////////<-----조건

    private BooleanExpression ltBookId(Long cursorId) {

        return cursorId == 0 ? null : book.bookId.lt(cursorId);
    }


    private BooleanExpression notReadByUser(Long userId) {
        return book.notIn(
                JPAExpressions.select(readBook.book)
                        .from(readBook)
                        .where(readBook.user.userId.eq(userId))
        );
    }


    private Predicate cursorIdAndCursorScore(Long cursorId, Double cursorScore) {
        return (book.score.eq(cursorScore)
                .and(ltBookId(cursorId)))
//                .and(book.bookId.lt(cursorId)))
                .or(book.score.lt(cursorScore));
    }

    private BooleanExpression filterGenreCd(int typeCode) {
        StringTemplate genreIdSubstr = Expressions.stringTemplate("function('substring', {0}, {1}, {2})", genre.gerneId, 1, 1);

        switch (typeCode) {
            case 1:
                return genreIdSubstr.eq("2").or(
                        genre.gerneId.notIn(12L, 16L)
                );
            case 0:
                return genreIdSubstr.eq("1");
        }

        return null; // 장르 코드로 사용할 때
    }


}
