package com.emosaac.server.repository.book;

import com.emosaac.server.domain.book.Book;
import com.emosaac.server.domain.book.Hit;
import com.emosaac.server.domain.book.ReadBook;
import com.emosaac.server.dto.book.*;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static com.emosaac.server.domain.book.QBook.book;
import static com.emosaac.server.domain.book.QBookMark.bookMark;
import static com.emosaac.server.domain.book.QHit.hit;
import static com.emosaac.server.domain.book.QReadBook.readBook;
import static com.emosaac.server.domain.book.QScore.score1;

@RequiredArgsConstructor
@Repository
public class BookQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    // 요일별 소설 리스트
    public Slice<BookListResponse> findBookListByDay(String day, int typeCd, Long genreCode, PageRequest page, Long prevId, Double prevScore) {
        List<BookListResponse> content = jpaQueryFactory.select(new QBookListResponse(book))
                .from(book)
                .where(
                        book.type.eq(typeCd),
                        book.day.contains(day),
                        cursorIdAndCursorScore(prevId, prevScore),
                        filterGenreCd(genreCode)
                )
                .orderBy(book.score.desc(),book.bookId.desc())  // 평점 추가
                .limit(page.getPageSize()+1)
                .fetch();

        boolean hasNext = false;
        if (content.size() == page.getPageSize()+1) {
            content.remove(page.getPageSize());
            hasNext = true;
        }

        return new SliceImpl<>(content, page, hasNext);
    }

    // 장르별 소설 리스트
    public Slice<BookListResponse> findBookListByGenre(Long genreCode, int typeCd, PageRequest page, Long prevId, Double prevScore) {
        List<BookListResponse> content = jpaQueryFactory.select(new QBookListResponse(book))
                .from(book)
                .where(
                        book.type.eq(typeCd),
                        book.genre.gerneId.eq(genreCode),
                        cursorIdAndCursorScore(prevId, prevScore)
                )
                .limit(page.getPageSize()+1)
                .orderBy(book.score.desc(),book.bookId.desc())
                .fetch();

        boolean hasNext = false;
        if (content.size() == page.getPageSize()+1) {
            content.remove(page.getPageSize());
            hasNext = true;
        }

        return new SliceImpl<>(content, page, hasNext);
    }

    // 소설 상세 조회
    public Optional<Book> findBookByBook(Long bookId) {
        return Optional.ofNullable(jpaQueryFactory.select(book)
                .from(book)
                .where(
                        book.bookId.eq(bookId)
                )
                .fetchOne());
    }

    // 같은 작가 다른 작품 조회
    public List<BookListResponse> findBookByAuthor(Long bookId, String[] author){

        return jpaQueryFactory.select(new QBookListResponse(book))
                .from(book)
                .where(
                        book.author.in(author),
                        book.bookId.ne(bookId)
                )
                .orderBy(book.score.desc(), book.bookId.desc())
                .fetch();
    }

    public List<BookListResponse> findBookByHit(Long userId){

        return jpaQueryFactory.select(new QBookListResponse(book))
                .from(book).join(hit).on(book.bookId.eq(hit.book.bookId))
                .where(
                        hit.user.userId.eq(userId)
                )
                .orderBy(hit.modifiedDate.desc())
                .limit(4)
                .fetch();
    }

    private BooleanExpression ltBookId(Long cursorId) {
        return cursorId == 0 ? null : book.bookId.lt(cursorId);
    }

    private Predicate cursorIdAndCursorScore(Long cursorId, Double cursorScore) {
        return (book.score.eq(cursorScore)
                .and(ltBookId(cursorId)))
                .or(book.score.lt(cursorScore));
    }

    public Optional<ReadBook> findBookRecent(Long userId){
        return Optional.ofNullable(jpaQueryFactory.select(readBook)
                .from(readBook)
                .where(
                        readBook.user.userId.eq(userId)
                )
                .orderBy(readBook.modifiedDate.desc())
                .limit(1)
                .fetchOne());
    }

    public Optional<Hit> findBookRecentHit(Long userId){
        return Optional.ofNullable(jpaQueryFactory.select(hit)
                .from(hit)
                .where(
                        hit.user.userId.eq(userId)
                )
                .orderBy(hit.modifiedDate.desc())
                .limit(1)
                .fetchOne());
    }

    public Optional<BookListResponse> findBookRead(Long bookId, Long userId) {
        return Optional.ofNullable(jpaQueryFactory.select(new QBookListResponse(readBook.book))
                .from(readBook)
                .where(
                        readBook.book.bookId.eq(bookId),
                        readBook.user.userId.eq(userId)
                )
                .fetchOne());
    }

    /*-  10: 로맨스, 11: 로판, 12: 드라마, 13: 판타지, 14: 액션/무협, 15: BL/GL, 16: 공포 27: 현판, 28: 미스터리 */
    private Predicate filterGenreCd(Long genreCode) {

        if(genreCode == 0 || genreCode == null) return null;

        return book.genre.gerneId.eq(genreCode); // 장르 코드로 사용할 때
    }

    public Slice<MyListResponse> findBookMarkList(int typeCd, PageRequest page, Long prevId, LocalDateTime prevTime, Long userId) {
        List<MyListResponse> content = jpaQueryFactory.select(new QMyListResponse(book, bookMark.modifiedDate))
                .from(book).join(bookMark).on(book.bookId.eq(bookMark.book.bookId))
                .where(
                        book.type.eq(typeCd),
                        bookMark.user.userId.eq(userId),
                        cursorIdAndCursorTime("bookMark", prevId, prevTime)
                )
                .orderBy(bookMark.modifiedDate.desc(),book.bookId.desc())
                .limit(page.getPageSize()+1)
                .fetch();

        boolean hasNext = false;
        if (content.size() == page.getPageSize()+1) {
            content.remove(page.getPageSize());
            hasNext = true;
        }

        return new SliceImpl<>(content, page, hasNext);
    }

    public Slice<MyListResponse> findReadBookList(int typeCd, PageRequest page, Long prevId, LocalDateTime prevTime, Long userId) {
        List<MyListResponse> content = jpaQueryFactory.select(new QMyListResponse(book, readBook.modifiedDate))
                .from(book).join(readBook).on(book.bookId.eq(readBook.book.bookId))
                .where(
                        book.type.eq(typeCd),
                        readBook.user.userId.eq(userId),
                        cursorIdAndCursorTime("readBook", prevId, prevTime)
                )
                .orderBy(readBook.modifiedDate.desc(),book.bookId.desc())
                .limit(page.getPageSize()+1)
                .fetch();

        boolean hasNext = false;
        if (content.size() == page.getPageSize()+1) {
            content.remove(page.getPageSize());
            hasNext = true;
        }

        return new SliceImpl<>(content, page, hasNext);
    }

    public Slice<MyListResponse> findMyScoreList(int typeCd, PageRequest page, Long prevId, LocalDateTime prevTime, Long userId) {
        List<MyListResponse> content = jpaQueryFactory.select(new QMyListResponse(book, score1.score, score1.modifiedDate))
                .from(book).join(score1).on(book.bookId.eq(score1.book.bookId))
                .where(
                        book.type.eq(typeCd),
                        score1.user.userId.eq(userId),
                        cursorIdAndCursorTime("score1", prevId, prevTime)
                )
                .orderBy(score1.modifiedDate.desc(),book.bookId.desc())
                .limit(page.getPageSize()+1)
                .fetch();

        boolean hasNext = false;
        if (content.size() == page.getPageSize()+1) {
            content.remove(page.getPageSize());
            hasNext = true;
        }

        return new SliceImpl<>(content, page, hasNext);
    }

    private Predicate cursorIdAndCursorTime(String tableName, Long cursorId, LocalDateTime cursorTime) {
        if(tableName.equals("bookMark")){
            return (bookMark.modifiedDate.eq(cursorTime)
                    .and(ltBookId(cursorId)))
                    .or(bookMark.modifiedDate.lt(cursorTime));
        }
        else if(tableName.equals("readBook")){
            return (readBook.modifiedDate.eq(cursorTime)
                    .and(ltBookId(cursorId)))
                    .or(readBook.modifiedDate.lt(cursorTime));
        }

        return (score1.modifiedDate.eq(cursorTime)
                .and(ltBookId(cursorId)))
                .or(score1.modifiedDate.lt(cursorTime));
    }

    public List<BookListResponse> findBookByPlatform(int platCd) {
        return jpaQueryFactory.select(new QBookListResponse(book))
                .from(book)
                .where(
                        book.platform.eq(platCd)
                )
                .orderBy(book.score.desc())
                .limit(15)
                .fetch();
    }
}
