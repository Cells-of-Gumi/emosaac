package com.emosaac.server.dto.comment;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CommentLikeResponse {
    Long commentId;
    boolean likeState;
    int likeCount;

    @QueryProjection
    public CommentLikeResponse(Long commentId, boolean likeState, int likeCount ){
        this.commentId = commentId;
        this.likeState = likeState;
        this.likeCount = likeCount;
    }
}
