package com.emosaac.server.dto.comment;

import com.emosaac.server.domain.comment.Comment;
import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

@Builder
@Getter
@AllArgsConstructor
public class CommentResponse {
    private Long commentId;

    private String content;

    private WriterInfo writerInfo;

    private String parentWriterNickName;

    private Integer depth;

    private String createdDate;

    private String modifiedDate;

    private Boolean isDelete;
    private Boolean isChild = false; // 자식 가지고 있는지
    private Integer likeStatusSize;
    private Boolean likeState;
    private Long totalCount;

//    private List<CommentResponse> children = new ArrayList<>();
    @QueryProjection
    public CommentResponse(Comment comment) { //전체 조회

        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        this.writerInfo = WriterInfo.from(comment.getUser());
        this.commentId = comment.getCommentId();
        this.content = comment.getContent();
        this.depth = comment.getDepth();
        this.createdDate = comment.getCreatedDate().format(myFormatObj);
        if(comment.getModifiedDate()!=null) {
            this.modifiedDate = comment.getModifiedDate().format(myFormatObj);
        }
        if( comment.getParent()!= null) {
            this.parentWriterNickName = comment.getParent().getUser().getUserName();
        }
        this.isDelete = comment.getIsDelete();
        if(comment.getChildren().size() != 0){
            isChild = true;
        }
        likeStatusSize = comment.getTotalLikes();

//        this.children = comment.getChildren().stream().map((c)-> new CommentResponse(c)).collect(Collectors.toList());;
    }
    public CommentResponse(Comment comment, String content) { //삭제 처리된 댓글 결과
        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        this.writerInfo = WriterInfo.from(comment.getUser());
        this.commentId = comment.getCommentId();
        this.content = content;
        this.depth = comment.getDepth();
        this.createdDate = comment.getCreatedDate().format(myFormatObj);
        if(comment.getModifiedDate()!=null) {
            this.modifiedDate = comment.getModifiedDate().format(myFormatObj);
        }
        if( comment.getParent()!= null) {
            this.parentWriterNickName = comment.getParent().getUser().getUserName(); //닉네임으로 변경 필요
        }
        this.isDelete = comment.getIsDelete();
        likeStatusSize = comment.getTotalLikes();

    }
    public void updateLikeState(Boolean likeState){
        this.likeState = likeState;
    }
    public void updateTotalCount(Long totalCount){
        this.totalCount = totalCount;
    }
    public static CommentResponse from(Comment comment) {
        return comment.getIsDelete() ?
                new CommentResponse(comment, "삭제된 댓글입니다") : new CommentResponse(comment);
    }


}
