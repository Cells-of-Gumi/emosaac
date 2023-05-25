package com.emosaac.server.repository.emopick;

import com.emosaac.server.dto.emopick.*;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.emosaac.server.domain.book.QBook.book;
import static com.emosaac.server.domain.emo.QEmopick.emopick;
import static com.emosaac.server.domain.emo.QEmopickDetail.emopickDetail;
import static com.emosaac.server.domain.comment.QComment.comment;
import static com.emosaac.server.domain.emo.QLikeEmo.likeEmo;

@RequiredArgsConstructor
@Repository
public class EmopickQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public Slice<EmopickListResponse> findEmopickList(PageRequest page, Long prevId, Long userId) {

        List<EmopickListResponse> content = jpaQueryFactory.select(new QEmopickListResponse(emopick))
                .from(emopick)
                .where(
                        checkUserId(userId),
                        ltEmopickId(prevId)
                )
                .orderBy(emopick.EmopickId.desc())
                .limit(page.getPageSize()+1)
                .fetch();

        boolean hasNext = false;
        if (content.size() == page.getPageSize()+1) {
            content.remove(page.getPageSize());
            hasNext = true;
        }

        return new SliceImpl<>(content, page, hasNext);
    }

    public Slice<EmopickListResponse> findEmopickListByComment(PageRequest page, Long prevId, Long userId) {
        List<EmopickListResponse> content = jpaQueryFactory.select(new QEmopickListResponse(emopick))
                .from(emopick)
                .join(comment).on(emopick.EmopickId.eq(comment.emopick.EmopickId))
                .where(
                        comment.user.userId.eq(userId),
                        ltEmopickId(prevId)
                )
                .limit(page.getPageSize()+1)
                .orderBy(comment.modifiedDate.desc())
                .fetch();

        boolean hasNext = false;
        if (content.size() == page.getPageSize()+1) {
            content.remove(page.getPageSize());
            hasNext = true;
        }
        return new SliceImpl<>(content, page, hasNext);
    }

    public Slice<EmopickListResponse> findEmopickListByLike(PageRequest page, Long prevId, Long userId) {
        List<EmopickListResponse> content = jpaQueryFactory.select(new QEmopickListResponse(emopick))
                .from(emopick)
                .join(likeEmo).on(emopick.EmopickId.eq(likeEmo.emopick.EmopickId))
                .where(
                        likeEmo.user.userId.eq(userId),
                        ltEmopickId(prevId)
                )
                .limit(page.getPageSize()+1)
                .orderBy(likeEmo.modifiedDate.desc())
                .fetch();

        boolean hasNext = false;
        if (content.size() == page.getPageSize()+1) {
            content.remove(page.getPageSize());
            hasNext = true;
        }
        return new SliceImpl<>(content, page, hasNext);
    }

    private Predicate checkUserId(Long userId) {
        return userId == null ? null : emopick.user.userId.eq(userId);
    }

    public List<ThumbnailListResponse> findThumbnail(Long emopickId) {
        return jpaQueryFactory.select(new QThumbnailListResponse(book))
                .from(book).join(emopickDetail).on(book.bookId.eq(emopickDetail.book.bookId))
                .where(
                        emopickDetail.emopick.EmopickId.eq(emopickId)
                ).fetch();
    }

    private BooleanExpression ltEmopickId(Long cursorId) {
        return cursorId == 0 ? null : emopick.EmopickId.lt(cursorId);
    }

    public List<BookReviewResponse> findEmopickDetailByEmopickId(Long emopickId, int type) {
        return jpaQueryFactory.select(new QBookReviewResponse(book, emopickDetail))
                .from(book).join(emopickDetail).on(book.bookId.eq(emopickDetail.book.bookId))
                .where(
                        emopickDetail.emopick.EmopickId.eq(emopickId),
                        emopickDetail.type.eq(type)
                )
                .orderBy(emopickDetail.createdDate.asc())
                .fetch();
    }


    public Long findLikeCnt(Long emopickId) {
        return jpaQueryFactory.select(emopick.count())
                .from(emopick).join(likeEmo).on(emopick.EmopickId.eq(likeEmo.emopick.EmopickId))
                .where(
                        likeEmo.emopick.EmopickId.eq(emopickId)
                )
                .fetchOne();
    }

    public Long findBookCnt(Long emopickId) {
        return jpaQueryFactory.select(emopick.count())
                .from(emopick).join(emopickDetail).on(emopick.EmopickId.eq(emopickDetail.emopick.EmopickId))
                .where(
                        emopickDetail.emopick.EmopickId.eq(emopickId)
                )
                .fetchOne();
    }
}
