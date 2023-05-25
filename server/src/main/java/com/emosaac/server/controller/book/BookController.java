package com.emosaac.server.controller.book;

import com.emosaac.server.common.CommonResponse;
import com.emosaac.server.security.CurrentUser;
import com.emosaac.server.security.UserPrincipal;
import com.emosaac.server.service.book.BookService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequestMapping("/api/books")
@Api(tags = {"북 컨트롤러"})
public class BookController {

    @Autowired
    BookService bookService;

    @ApiOperation(value = "요일별 리스트", notes = "요일별 웹툰 리스트를 조회한다.")
    @GetMapping("/day/{day}")
    public ResponseEntity<CommonResponse> findDayList(@PathVariable String day,
                                                      @RequestParam (value = "typeCode") int typeCd,
                                                      @RequestParam(required=false, defaultValue = "0") Long genreCode,
                                                      @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                      @RequestParam(value = "prevId", required = false, defaultValue = "0")Long prevId,
                                                      @RequestParam(value = "prevScore", required = false, defaultValue = "10")Double prevScore) {
//

        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "요일별 리스트 조회 성공", bookService.findDayList(day, typeCd, genreCode, size, prevId, prevScore)
        ));
    }

    @ApiOperation(value = "장르별 리스트", notes = "장르별 웹툰 리스트를 조회한다.")
    @GetMapping("/genre/{genreCode}")
    public ResponseEntity<CommonResponse> findGenreList(@PathVariable Long genreCode,
                                                        @RequestParam (value = "typeCode") int typeCd,
                                                        @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                        @RequestParam(value = "prevId", required = false, defaultValue = "0")Long prevId,
                                                        @RequestParam(value = "prevScore", required = false, defaultValue = "10")Double prevScore) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "장르별 리스트 조회 성공", bookService.findGenreList(genreCode, typeCd, size, prevId, prevScore)
        ));
    }

    @ApiOperation(value = "작품 디테일", notes = "작품의 상세정보를 조회한다.")
    @GetMapping("/{bookId}")
    public ResponseEntity<CommonResponse> findDetailByWebtoon(@PathVariable Long bookId,
                                                              @ApiIgnore @CurrentUser UserPrincipal userPrincipal) {

        if(userPrincipal == null){
            return ResponseEntity.ok().body(CommonResponse.of(
                    HttpStatus.OK, "작품 디테일 조회 성공", bookService.findDetailByBook(bookId, null)
            ));
        }

        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "작품 디테일 조회 성공", bookService.findDetailByBook(bookId, userPrincipal.getId())
        ));
    }

    @ApiOperation(value = "북마크 리스트", notes = "내가 설정한 북마크 리스트를 조회한다.")
    @GetMapping("/bookmark")
    public ResponseEntity<CommonResponse> findBookmarkList(@RequestParam (value = "typeCode") int typeCd,
                                                           @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                           @RequestParam(value = "prevId", required = false, defaultValue = "0")Long prevId,
                                                           @RequestParam(value = "prevTime", required = false, defaultValue = "0")String prevTime,
                                                           @ApiIgnore @CurrentUser UserPrincipal userPrincipal) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "북마크 리스트 조회 성공", bookService.findBookmarkList(typeCd, size, prevId, prevTime, userPrincipal.getId())
        ));
    }

    @ApiOperation(value = "북마크", notes = "작품의 북마크를 설정한다.")
    @PutMapping("/bookmark/{bookId}")
    public ResponseEntity<CommonResponse> setBookmarkByWebtoon(@PathVariable Long bookId,
                                                               @ApiIgnore @CurrentUser UserPrincipal userPrincipal) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "북마크 수정 성공", bookService.toggleBookmarkByBook(bookId, userPrincipal.getId())
        ));
    }

    @ApiOperation(value = "읽은 책 리스트", notes = "내가 읽은 책 리스트를 조회한다.")
    @GetMapping("/read-book")
    public ResponseEntity<CommonResponse> findReadBookList(@RequestParam (value = "typeCode") int typeCd,
                                                           @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                           @RequestParam(value = "prevId", required = false, defaultValue = "0")Long prevId,
                                                           @RequestParam(value = "prevTime", required = false, defaultValue = "0")String prevTime,
                                                           @ApiIgnore @CurrentUser UserPrincipal userPrincipal) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "읽은 책 리스트 조회 성공", bookService.findReadBookList(typeCd, size, prevId, prevTime, userPrincipal.getId())
        ));
    }

    @ApiOperation(value = "읽음 유무", notes = "작품의 읽음 여부를 설정한다.")
    @PutMapping("/read-check/{bookId}")
    public ResponseEntity<CommonResponse> setReadByWebtoon(@PathVariable Long bookId,
                                                           @ApiIgnore @CurrentUser UserPrincipal userPrincipal) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "읽음 유무 설정 성공", bookService.toggleReadByBook(bookId, userPrincipal.getId())
        ));
    }

    /* 평점 */

    @ApiOperation(value = "평점 리스트", notes = "내가 설정한 평점 리스트를 조회한다.")
    @GetMapping("/score")
    public ResponseEntity<CommonResponse> findMyScoreList(@RequestParam (value = "typeCode") int typeCd,
                                                          @RequestParam(value = "size", required = false, defaultValue = "10") int size,
                                                          @RequestParam(value = "prevId", required = false, defaultValue = "0")Long prevId,
                                                          @RequestParam(value = "prevTime", required = false, defaultValue = "0")String prevTime,
                                                          @ApiIgnore @CurrentUser UserPrincipal userPrincipal) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "평점 리스트 조회 성공", bookService.findMyScoreList(typeCd, size, prevId, prevTime, userPrincipal.getId())
        ));
    }

    @ApiOperation(value = "평점 조회", notes = "사용자가 설정한 평점을 조회한다.")
    @GetMapping("/score/{bookId}")
    public ResponseEntity<CommonResponse> findScoreByUser(@PathVariable Long bookId,
                                                          @ApiIgnore @CurrentUser UserPrincipal userPrincipal) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "평점 조회 성공", bookService.findScoreByUserAndBook(bookId, userPrincipal.getId())
        ));
    }

    @ApiOperation(value = "평점 수정", notes = "사용자가 설정한 평점을 수정한다.")
    @PutMapping("/score/{bookId}")
    public ResponseEntity<CommonResponse> updateScoreByUser(@PathVariable Long bookId,
                                                            @ApiIgnore @CurrentUser UserPrincipal userPrincipal,
                                                            @RequestParam(value = "score", defaultValue = "0")Double score) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "평점 수정 성공", bookService.updateScoreByUserAndBook(bookId, userPrincipal.getId(), score)
        ));
    }

    ////////////////////

    @ApiOperation(value = "같은 작가 다른 작품", notes = "같은 작가 다른 작품을 조회한다.")
    @GetMapping("/author/{bookId}")
    public ResponseEntity<CommonResponse> findListByAuthor(@PathVariable Long bookId) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "같은 작가 다른 작품 조회 성공", bookService.findListByAuthor(bookId)
        ));
    }

    @ApiOperation(value = "플랫폼별 리스트 조회", notes = "플랫폼별로 책 15개를 조회한다.")
    @GetMapping("/platform")
    public ResponseEntity<CommonResponse> findListByPlatform() {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "플랫폼별 리스트 조회 성공", bookService.findListByPlatform()
        ));
    }

}
