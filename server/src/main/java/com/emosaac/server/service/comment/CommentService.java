package com.emosaac.server.service.comment;

import com.emosaac.server.common.exception.ResourceForbiddenException;
import com.emosaac.server.common.exception.ResourceNotFoundException;
import com.emosaac.server.domain.book.Book;
import com.emosaac.server.domain.comment.Comment;
import com.emosaac.server.domain.comment.CommentLike;
import com.emosaac.server.domain.emo.Emopick;
import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.comment.CommentLikeResponse;
import com.emosaac.server.dto.comment.CommentResponse;
import com.emosaac.server.dto.comment.CommentSaveRequest;
import com.emosaac.server.dto.comment.CommentUpdateRequest;
import com.emosaac.server.repository.comment.CommentLikeRepository;
import com.emosaac.server.repository.comment.CommentQueryRepository;
import com.emosaac.server.repository.comment.CommentRepository;
import com.emosaac.server.repository.emopick.EmopickRepository;
import com.emosaac.server.service.CommonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentService {
    private final CommonService commonService;
    private final CommentRepository commentRepository;
    private final CommentLikeRepository commentLikeRepository;
    private final CommentQueryRepository commentQueryRepository;
    private final EmopickRepository emopickRepository;

    @Transactional
    public Long createComment(int commentType, Long userId, Long itemId, CommentSaveRequest request) {
        Book book = null;
        Emopick emopick = null;
        if(commentType == 0){
            book = commonService.getBook(itemId);
        }else{
            emopick = emopickRepository.findById(itemId).orElseThrow(() -> new ResourceNotFoundException("emopick", "emopickId", itemId));
        }
        User user = commonService.getUser(userId);
        Comment comment = null;
        if(request.getParentId() != null){
            Comment parent = commentRepository.findComment(request.getParentId()).orElseThrow(() -> new ResourceNotFoundException("ParentComment", "parentId", request.getParentId()));;
            comment =  (commentType==0?commentRepository.save(request.of(user, book, parent,1)) : commentRepository.save(request.of(user, emopick, parent,1)));
            parent.setChild(comment);
        }
        else{
            comment =  (commentType==0?commentRepository.save(request.of(user, book,0)) : commentRepository.save(request.of(user, emopick, 1)));
        }

        return comment.getCommentId();
    }

    @Transactional
    public Long updateBookComment(Long userId, Long commentId, CommentUpdateRequest request) {
        Comment comment = commentRepository.findComment(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("BookComment", "commentId", commentId));

        validBookCommentUser(userId, comment.getUser().getUserId());
        comment.update(request);
        return comment.getCommentId();
    }

    @Transactional
    public Long deleteBookComment(Long userId, Long commentId) {
        Comment comment = commentRepository.findComment(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("BookComment", "commentId", commentId));
        validBookCommentUser(userId, comment.getUser().getUserId());

        if(comment.getParent() == null && !comment.getChildren().isEmpty()){ // 부모 댓글인데 자식 댓글이 있는 경우
            comment.updateDeleteStatus();
        }else if(comment.getParent() != null){ // 자식 댓글 삭제할 경우
            commentLikeRepository.deleteByBookCommentId(commentId);
            commentRepository.deleteByCommentId(commentId);
            // 부모 댓글 삭제 & 자식이 없다면 부모 댓글도 삭제
            Comment parent = comment.getParent();
            commentRepository.deleteByCommentId(commentId);
            if(parent.getIsDelete() && commentRepository.findParentComment(parent.getCommentId()).isEmpty()){
                commentLikeRepository.deleteByBookCommentId(parent.getCommentId());
                commentRepository.deleteByCommentId(parent.getCommentId());
            }
        }else{
            commentLikeRepository.deleteByBookCommentId(commentId);
            commentRepository.deleteByCommentId(commentId);
        }
        return commentId;
    }

    public List<CommentResponse> findParentCommentList(int commentType, Long userId, Long itemId, String criteria, int offset, int size) {
        List<CommentResponse> res = commentQueryRepository.findParentCommentByItemId(commentType, itemId, criteria, PageRequest.of(offset - 1, size));
        for(CommentResponse cr : res){
            cr.updateTotalCount(commentQueryRepository.findParentCommentCount(commentType, itemId));
            if( commentQueryRepository.findCommentLikeState(cr.getCommentId(), userId).isEmpty()){
                cr.updateLikeState(false);
            }else {
                cr.updateLikeState(true);
            }
        }
        return res;
    }

    public List<CommentResponse> findChildCommentList(Long userId, Long parentId, String criteria, int offset, int size) {
        List<CommentResponse> res = commentQueryRepository.findChildCommentByBookId(parentId, criteria, PageRequest.of(offset - 1, size));
        for(CommentResponse cr : res){
            cr.updateTotalCount(commentQueryRepository.findChildCommentCount(parentId));
            if(commentQueryRepository.findCommentLikeState(cr.getCommentId(), userId).isEmpty()){
                cr.updateLikeState(false);
            }else {
                cr.updateLikeState(true);
            }
        }
        return res;
    }
    @Transactional
    public CommentLikeResponse toggleBookCommentLike(Long userId, Long commentId) {
        Comment comment = commentRepository.findByCommentId(commentId);
        User user = commonService.getUser(userId);
        CommentLike commentLike = CommentLike.builder().comment(comment).user(user).build();
        return new CommentLikeResponse(comment.getCommentId(), comment.toggleCommentLike(commentLike), comment.getTotalLikes());
    }
    public void validBookCommentUser(Long currentUser, Long CommentUser) {
        if (currentUser == CommentUser || currentUser.equals(CommentUser)) {
            return;
        } else {
            throw new ResourceForbiddenException("본인이 작성한 글이 아닙니다");
        }
    }
}
