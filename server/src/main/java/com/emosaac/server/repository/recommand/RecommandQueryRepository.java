package com.emosaac.server.repository.recommand;

import com.emosaac.server.dto.book.BookListResponse;
import com.emosaac.server.dto.book.QBookListResponse;
import com.emosaac.server.dto.recommand.PredictedBookResponse;
import com.emosaac.server.dto.recommand.QPredictedBookResponse;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static com.emosaac.server.domain.book.QBook.book;
import static com.emosaac.server.domain.recommand.QItemBasedCFModel.itemBasedCFModel;
import static com.emosaac.server.domain.recommand.QTotalByAgeAndGenderModel.totalByAgeAndGenderModel;
import static com.emosaac.server.domain.recommand.QUserBasedCFModel.userBasedCFModel;
import static com.emosaac.server.domain.recommand.QUserPredictedGradeModel.userPredictedGradeModel;

@RequiredArgsConstructor
@Repository
public class RecommandQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public Slice<BookListResponse> findBestList(int typeCd, PageRequest page) {
        List<BookListResponse> content = jpaQueryFactory.select(new QBookListResponse(book))
                .from(book)
                .where(
                        book.type.eq(typeCd)
//                        cursorIdAndCursorScoreAndCursorHit(prevId, prevScore, hit)
                )
                .limit(30)
                .orderBy(book.hit.desc(), book.score.desc(), book.bookId.desc())
                .fetch();

        boolean hasNext = false;
        if (content.size() == page.getPageSize() + 1) {
            content.remove(page.getPageSize());
            hasNext = true;
        }

        return new SliceImpl<>(content, page, hasNext);
    }
    public Slice<BookListResponse> findNewBookList(String regist, int typeCd, Long prevId, PageRequest page) {
        LocalDate currentDate = LocalDate.now();
//        System.out.println(currentDate);

        List<BookListResponse> content = jpaQueryFactory.select(new QBookListResponse(book))
                .from(book)
                .where(book.type.eq(typeCd),
                        cursorIdAndCursorRegist(prevId, regist),
                        book.regist.gt(String.valueOf(currentDate))
                )
                .limit(page.getPageSize() + 1)
                .orderBy(book.regist.desc(), book.bookId.desc())
                .fetch();

        boolean hasNext = false;
        if (content.size() == page.getPageSize() + 1) {
            content.remove(page.getPageSize());
            hasNext = true;
        }

        return new SliceImpl<>(content, page, hasNext);
    }
    private Predicate cursorIdAndCursorScoreAndCursorHit(Long cursorId, Double cursorScore, Integer hit) {
        return (book.hit.eq(hit).and(book.score.lt(cursorScore)))
                .or(book.score.eq(cursorScore).and(book.bookId.lt(cursorId)))
                .or(book.hit.lt(hit));
    }
    private Predicate cursorIdAndCursorRegist(Long cursorId, String regist) {
        return (book.regist.eq(regist).and(book.bookId.lt(cursorId)))
                .or(book.regist.lt(regist));
    }

    public String findItemList(Long bookId) {
        return jpaQueryFactory.select(itemBasedCFModel.bookNoList)
                .from(itemBasedCFModel)
                .where(itemBasedCFModel.book.bookId.eq(bookId))
                .fetchOne();
    }

    public String findAgeAndGenderList(Integer age, Integer gender, int typeCd) {
        return jpaQueryFactory.select(totalByAgeAndGenderModel.bookNoList)
                .from(totalByAgeAndGenderModel)
                .where(totalByAgeAndGenderModel.gender.eq(gender),
                        totalByAgeAndGenderModel.age.eq(age),
                        totalByAgeAndGenderModel.typeCode.eq(typeCd)
                        )
                .fetchOne();
    }
//
    public String findUserList(Long userId, int typeCd) {
        return jpaQueryFactory.select(userBasedCFModel.bookNoList)
                .from(userBasedCFModel)
                .where(userBasedCFModel.user.userId.eq(userId),
                        userBasedCFModel.typeCode.eq(typeCd))
                .fetchOne();
    }

    public Slice<PredictedBookResponse> findPredictList(int typeCd, PageRequest page, Long prevId, Double prevScore, Long userId) {
        List<PredictedBookResponse> content = jpaQueryFactory.select(new QPredictedBookResponse(book, userPredictedGradeModel.predictScore))
                .from(book).join(userPredictedGradeModel).on(book.bookId.eq(userPredictedGradeModel.book.bookId))
                .where(
                        book.type.eq(typeCd),
                        userPredictedGradeModel.user.userId.eq(userId),
                        cursorIdAndCursorScore(prevId, prevScore)
                )
                .orderBy(userPredictedGradeModel.predictScore.desc(),book.bookId.desc())
                .limit(page.getPageSize()+1)
                .fetch();

        boolean hasNext = false;
        if (content.size() == page.getPageSize()+1) {
            content.remove(page.getPageSize());
            hasNext = true;
        }

        return new SliceImpl<>(content, page, hasNext);
    }


    private BooleanExpression ltBookId(Long cursorId) {
        return cursorId == 0 ? null : book.bookId.lt(cursorId);
    }

    private Predicate cursorIdAndCursorScore(Long cursorId, Double cursorScore) {
        return (userPredictedGradeModel.predictScore.eq(cursorScore)
                .and(ltBookId(cursorId)))
                .or(userPredictedGradeModel.predictScore.lt(cursorScore));
    }

}
