package com.emosaac.server.controller.emopick;

import com.emosaac.server.common.CommonResponse;
import com.emosaac.server.dto.emopick.EmopickSaveRequest;
import com.emosaac.server.security.CurrentUser;
import com.emosaac.server.security.UserPrincipal;
import com.emosaac.server.service.emopick.EmopickService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/emopicks")
@Api(tags = {"이모픽 컨트롤러"})
public class EmopickController {

    @Autowired
    EmopickService emopickService;

    @ApiOperation(value = "이모픽 리스트 조회", notes = "이모픽 리스트를 조회한다.")
    @GetMapping
    public ResponseEntity<CommonResponse> findEmopickList(@RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                          @RequestParam(value = "prevId", required = false, defaultValue = "0")Long prevId) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "이모픽 조회 완료", emopickService.findEmopickList(size, prevId, null)
        ));
    }

    @ApiOperation(value = "내가 작성한 이모픽 리스트 조회", notes = "내가 작성한 이모픽 리스트를 조회한다.")
    @GetMapping("/me")
    public ResponseEntity<CommonResponse> findEmopickListByUser(@RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                                @RequestParam(value = "prevId", required = false, defaultValue = "0")Long prevId,
                                                                @ApiIgnore @CurrentUser UserPrincipal userPrincipal) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "내가 작성한 이모픽 조회 완료", emopickService.findEmopickList(size, prevId, userPrincipal.getId())
        ));
    }

    @ApiOperation(value = "이모픽 상세 조회", notes = "이모픽을 상세 조회한다.")
    @GetMapping("/{emopickId}")
    public ResponseEntity<CommonResponse> findEmopickDetail(@PathVariable Long emopickId,
                                                            @ApiIgnore @CurrentUser UserPrincipal userPrincipal) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "이모픽 상세 조회 완료", emopickService.findEmopickDetail(emopickId, userPrincipal.getId())
        ));
    }

    @ApiOperation(value = "내가 댓글 쓴 이모픽 조회", notes = "내가 댓글 쓴 이모픽 조회")
    @GetMapping("/me/comment")
    public ResponseEntity<CommonResponse> findEmopickListByComment(@ApiIgnore @CurrentUser UserPrincipal user,
                                                                    @RequestParam(value = "prevId", required = false, defaultValue = "0")Long prevId,
                                                                    @RequestParam(value = "size", required = false, defaultValue = "10") int size){


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "사용자가 댓글 남긴 이모픽 목록 조회 성공", emopickService.findEmopickListByComment(user.getId(), prevId, size)));
    }
    @ApiOperation(value = "내가 좋아요 한 이모픽 조회", notes = "내가 좋아요 한 쓴 이모픽 조회")
    @GetMapping("/me/like")
    public ResponseEntity<CommonResponse> findEmopickListByLike(@ApiIgnore @CurrentUser UserPrincipal user,
                                                                    @RequestParam(value = "prevId", required = false, defaultValue = "0")Long prevId,
                                                                    @RequestParam(value = "size", required = false, defaultValue = "10") int size){


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "사용자가 좋아요 누른 이모픽 목록 조회 성공", emopickService.findEmopickListByLike(user.getId(), prevId, size)));
    }
    @ApiOperation(value = "이모픽 등록", notes = "유저가 이모픽을 등록한다.")
    @PostMapping
    public ResponseEntity<CommonResponse> createEmopickByUser(@RequestBody @Valid EmopickSaveRequest request,
                                                              @ApiIgnore @CurrentUser UserPrincipal userPrincipal) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "이모픽 등록 완료", emopickService.createEmopickByUser(request, userPrincipal.getId())
        ));
    }

    @ApiOperation(value = "이모픽 수정", notes = "유저가 이모픽을 수정한다.")
    @PutMapping("/{emopickId}")
    public ResponseEntity<CommonResponse> updateEmopickByUser(@PathVariable Long emopickId,
                                                              @RequestBody @Valid EmopickSaveRequest request,
                                                              @ApiIgnore @CurrentUser UserPrincipal userPrincipal) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "이모픽 수정 완료", emopickService.updateEmopickByUser(emopickId, request, userPrincipal.getId())
        ));
    }

    @ApiOperation(value = "이모픽 삭제", notes = "유저가 이모픽을 삭제한다.")
    @DeleteMapping("/{emopickId}")
    public ResponseEntity<CommonResponse> deleteEmopickByUser(@PathVariable Long emopickId,
                                                              @ApiIgnore @CurrentUser UserPrincipal userPrincipal) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.NO_CONTENT, "이모픽 삭제 완료", emopickService.deleteEmopickByUser(emopickId, userPrincipal.getId())
        ));
    }

    //////////////
    @ApiOperation(value = "이모픽 좋아요", notes = "유저가 이모픽을 좋아요 설정한다.")
    @PutMapping("/{emopickId}/like")
    public ResponseEntity<CommonResponse> updateLikeByUser(@PathVariable Long emopickId,
                                                           @ApiIgnore @CurrentUser UserPrincipal userPrincipal) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "이모픽 수정 성공", emopickService.toggleLikesByEmopick(emopickId, userPrincipal.getId())
        ));
    }

}
