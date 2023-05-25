package com.emosaac.server.repository.comment;


import com.emosaac.server.domain.comment.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("select c from Comment c where c.commentId = :commentId")
    Optional<Comment> findComment(@Param("commentId") Long commnetId);
    @Query("select c from Comment c where c.commentId = :commentId")
    Comment findByCommentId(@Param("commentId") Long commnetId);

    @Transactional
    @Modifying
    @Query("delete from Comment c where c.commentId = :commentId")
    void deleteByCommentId(@Param("commentId") Long commentId);

    @Query("SELECT c FROM Comment c WHERE c.book.bookId = :postId")
    List<Comment> findCommentById(@Param("postId")Long postId);

    @Query("SELECT c FROM Comment c WHERE c.parent.commentId = :parentId")
    Optional<Comment> findParentComment(@Param("parentId")Long parentId);
}
