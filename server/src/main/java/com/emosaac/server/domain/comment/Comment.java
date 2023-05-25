package com.emosaac.server.domain.comment;

import com.emosaac.server.domain.BaseEntity;
import com.emosaac.server.domain.book.Book;
import com.emosaac.server.domain.emo.Emopick;
import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.comment.CommentUpdateRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DynamicInsert //@DynamicInsert사용
@DynamicUpdate
public class Comment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COMMENT_NO")
    private Long commentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="USER_NO")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="book_id")
    private Book book;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="EMOPICK_NO")
    private Emopick emopick;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Comment parent;

    @OneToMany(mappedBy = "parent", orphanRemoval = true)
    private List<Comment> children = new ArrayList<>();

    private Integer depth;//0과1

    @Column(columnDefinition="TEXT")
    private String content;

    @ColumnDefault("false")
    private Boolean isDelete; //삭제여부

    @Embedded
    private final CommentLikeList commentLikeList = new CommentLikeList();
    private Double likeScore;

    public void setChild(Comment comment) {
        this.children.add(comment);
    }

    @Builder
    public Comment(User user, Book book, Emopick emopick, String content, Comment parent, Integer depth) {
        this.user = user;
        this.book = book;
        this.emopick = emopick;
        this.content = content;
        this.parent = parent;
        this.depth = depth;
    }

//    @Builder
//    public Comment(User user, Emopick emopick, String content, Comment parent, Integer depth) {
//        this.user = user;
//        this.emopick = emopick;
//        this.content = content;
//        this.parent = parent;
//        this.depth = depth;
//    }

    public void update(CommentUpdateRequest request){
        this.content = request.getContent();
    }


    public void updateDeleteStatus() {
        this.isDelete = true;
        this.content = null;
    }

    public boolean toggleCommentLike(CommentLike commentLike) {
        boolean res = commentLikeList.toggleCommentLike(commentLike);
        this.likeScore = getTotalLikes().doubleValue();
        return res;
    }

    public Integer getTotalLikes(){
        return commentLikeList.size();
    }


}
