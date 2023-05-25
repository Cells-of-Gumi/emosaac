package com.emosaac.server.controller.comment;

import com.emosaac.server.common.CommonResponse;
import com.emosaac.server.dto.comment.CommentSaveRequest;
import com.emosaac.server.dto.comment.CommentUpdateRequest;
import com.emosaac.server.security.CurrentUser;
import com.emosaac.server.security.UserPrincipal;
import com.emosaac.server.service.comment.CommentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/comments")
@Api(tags = {"댓글 컨트롤러"})
public class CommentController {
    @Autowired
    private CommentService commentService;
    @ApiOperation(value ="댓글 등록", notes = "댓글을 등록한다. commentType:(0:작품, 1:이모픽) / itemId:(book조회:bookId, emopick조회:emopickId)" )
    @PostMapping("/{itemId}")
    public ResponseEntity<CommonResponse> createComment(@ApiIgnore @CurrentUser UserPrincipal user,
                                                            @RequestParam(required=false, defaultValue = "0") int commentType,
                                                            @PathVariable Long itemId,
                                                            @RequestBody @Valid CommentSaveRequest request) throws Exception {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "등록 성공", commentService.createComment(commentType, user.getId(), itemId, request)));
    }
    @ApiOperation(value = "댓글 수정", notes = "댓글을 수정한다")
    @PutMapping("/{commentId}")
    public ResponseEntity<CommonResponse> updateComment(@ApiIgnore @CurrentUser UserPrincipal user,
                                                            @PathVariable Long commentId,
                                                            @RequestBody @Valid CommentUpdateRequest request) throws Exception {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "수정 성공", commentService.updateBookComment(user.getId(), commentId, request)));
    }

    @ApiOperation(value = "댓글 삭제", notes = "단일 댓글을 삭제한다")
    @DeleteMapping("/{commentId}")
    public ResponseEntity<CommonResponse> deleteComment(@ApiIgnore @CurrentUser UserPrincipal user, @PathVariable Long commentId) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.NO_CONTENT, "삭제 성공", commentService.deleteBookComment(user.getId(), commentId)));
    }

    @ApiOperation(value = "해당 id의 부모 댓글 리스트 조회", notes = "조회하고자 하는 작품/이모픽의 id를 입력받은 후 댓글을 조회한다. criteria:(date : 날짜, like : 좋아요 순으로 정렬) / commentType(0:book, 1:emopick) / itemId:(book조회:bookId, emopick조회:emopickId)")
    @GetMapping("/parent/{itemId}")
    public ResponseEntity<CommonResponse> findParentBookCommentList(@ApiIgnore @CurrentUser UserPrincipal user,
                                                                    @RequestParam(required=true, defaultValue = "0") int commentType,
                                                                    @PathVariable Long itemId,
                                                              @RequestParam(required=false, defaultValue = "date") String criteria,
                                                              @RequestParam(required=false, defaultValue = "1") int offset,
                                                              @RequestParam(value = "size", required = false, defaultValue = "10") int size){


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "해당 게시물의 댓글 목록 조회 성공", commentService.findParentCommentList(commentType, user.getId(), itemId, criteria, offset, size)));
    }
    @ApiOperation(value = "해당 id의 자식 댓글 리스트 조회", notes = "부모 댓글의 parentId를 입력받은 후 댓글을 조회한다. criteria:(date : 날짜, like : 좋아요 순으로 정렬) / itemId:(book조회:bookId, emopick조회:emopickId)")
    @GetMapping("/child/{parentId}")
    public ResponseEntity<CommonResponse> findChildBookCommentList(@ApiIgnore @CurrentUser UserPrincipal user,
                                                                   @PathVariable Long parentId,
                                                              @RequestParam(required=false, defaultValue = "date") String criteria,
                                                              @RequestParam(required=false, defaultValue = "1") int offset,
                                                              @RequestParam(value = "size", required = false, defaultValue = "10") int size){


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "해당 게시물의 댓글 목록 조회 성공", commentService.findChildCommentList(user.getId(), parentId, criteria, offset, size)));
    }

    @ApiOperation(value = "댓글 좋아요", notes = "댓글에 좋아요 누른다")
    @PutMapping("/like/{commentId}")
    public ResponseEntity<CommonResponse> toggleBookCommentLike(@ApiIgnore @CurrentUser UserPrincipal user,
                                                                @PathVariable Long commentId) throws Exception {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "수정 성공", commentService.toggleBookCommentLike(user.getId(), commentId)));
    }

}
