package com.emosaac.server.controller.search;

import com.emosaac.server.common.CommonResponse;
import com.emosaac.server.security.CurrentUser;
import com.emosaac.server.security.UserPrincipal;
import com.emosaac.server.service.search.SearchService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequestMapping("/api/search")
@Api(tags = {"검색 컨트롤러"})
public class SearchController {
    @Autowired
    private SearchService searchService;

    @ApiOperation(value = "태그 이름별 리스트 조회", notes = "태그 이름별로, 평점 순으로 게시물 목록을 조회한다. type total:전체, webtoon:웹툰, novel:소설")
    @GetMapping("/tag/{type}/{tagName}")
    public ResponseEntity<CommonResponse> findByTagNameBookList(@PathVariable String tagName,
                                                                @PathVariable String type,
                                                                @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                                @RequestParam(value = "prevId", required = false, defaultValue = "20493")Long prevId,
                                                                @RequestParam(value = "prevScore", required = false, defaultValue = "10")Double prevScore){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "태그 이름별 게시물 목록 조회 성공", searchService.findBookListByTagName(tagName, type, size, prevId, prevScore))
        );
    }
    @ApiOperation(value = "제목/작가별 리스트 조회", notes = "제목/작가 이름별로, 평점 순으로 게시물 목록을 조회한다. type total:전체, webtoon:웹툰, novel:소설")
    @GetMapping("/title/{type}/{content}")
    public ResponseEntity<CommonResponse> findByTitlePostList(@PathVariable String content,
                                                              @PathVariable String type,
                                                              @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                              @RequestParam(value = "prevId", required = false, defaultValue = "20493")Long prevId,
                                                              @RequestParam(value = "prevScore", required = false, defaultValue = "10")Double prevScore){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "제목작가별 게시물 목록 조회 성공", searchService.findBookListByTitle(content, type, size, prevId, prevScore))
        );
    }

    /* 검색창 눌렀을 때, 최근 조회한 작품 4개 리스트 보내기 */
    @ApiOperation(value = "최근 조회한 작품 4개 조회", notes = "사용자가 최근 조회한 순으로 작품 목록을 조회한다.")
    @GetMapping("/latest-book")
    public ResponseEntity<CommonResponse> findBookByHit(@ApiIgnore @CurrentUser UserPrincipal userPrincipal){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "최근 조회한 작품 4개 조회 성공", searchService.findBookByHit(userPrincipal.getId()))
        );
    }
}
