package com.emosaac.server.repository.comment;



import com.emosaac.server.domain.comment.CommentLike;
import com.emosaac.server.dto.comment.CommentResponse;
import com.emosaac.server.dto.comment.QCommentResponse;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.emosaac.server.domain.comment.QComment.comment;
import static com.emosaac.server.domain.comment.QCommentLike.commentLike;

@RequiredArgsConstructor
@Repository
public class CommentQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;


    // 작품 당 부모 댓글 조회
    public List<CommentResponse> findParentCommentByItemId(int commentType, Long itemId, String criteria, PageRequest pageRequest){
        return jpaQueryFactory.select(new QCommentResponse(comment))
                .distinct().from(comment)
                .where(findItemByIdAndType(commentType, itemId),
                        comment.depth.eq(0))
                .orderBy(findCriteria(criteria))
                .offset(pageRequest.getOffset()).limit(pageRequest.getPageSize())
                .fetch();

    }
    // 부모 댓글 갯수
    public Long findParentCommentCount(int commentType, Long itemId){
        return jpaQueryFactory.select(comment.count())
                .distinct().from(comment)
                .where(findItemByIdAndType(commentType,itemId),
                        comment.depth.eq(0))
                .fetchOne();
    }
    // 작품에 사용자가 좋아요를 눌렀는 지 여부
    public Optional<CommentLike> findCommentLikeState(Long commentId, Long userId){
        return Optional.ofNullable(jpaQueryFactory.select(commentLike)
                .distinct().from(commentLike)
                .where(commentLike.comment.commentId.eq(commentId),
                        commentLike.user.userId.eq(userId))
                .fetchOne());

    }
    public List<CommentResponse> findChildCommentByBookId(Long parentId, String criteria, PageRequest pageRequest){ // 부모 댓글마다 자식 댓글 조회
        return jpaQueryFactory.select(new QCommentResponse(comment))
                .distinct().from(comment)
                .where(comment.parent.commentId.eq(parentId))
                .orderBy(findCriteria(criteria))
                .offset(pageRequest.getOffset()).limit(pageRequest.getPageSize())
                .fetch();
    }

    public Long findChildCommentCount(Long parentId){       // 부모 댓글 당 자식 댓글 수
        return jpaQueryFactory.select(comment.count())
                .distinct().from(comment)
                .where(comment.parent.commentId.eq(parentId))
                .fetchOne();
    }

    private OrderSpecifier[] findCriteria(String criteria){ //정렬 조건
        List<OrderSpecifier> orderSpecifiers = new ArrayList<>();
        if(criteria.contains("date")){
            orderSpecifiers.add(new OrderSpecifier(Order.DESC, comment.createdDate));
        } else if(criteria.contains("like")){
            orderSpecifiers.add(new OrderSpecifier(Order.DESC, comment.likeScore));
            orderSpecifiers.add(new OrderSpecifier(Order.DESC, comment.createdDate));
        }
        return orderSpecifiers.toArray(new OrderSpecifier[orderSpecifiers.size()]);
    }

    private BooleanExpression findItemByIdAndType(int type, Long itemId) { // 북인지 이모픽인지
        if(type == 0){
            return comment.book.bookId.eq(itemId);
        }else{
            return comment.emopick.EmopickId.eq(itemId);
        }
    }
}
