package com.emosaac.server.controller.genre;

import com.emosaac.server.common.CommonResponse;
import com.emosaac.server.dto.book.BookRequest;
import com.emosaac.server.dto.genre.GenreResponseList;
import com.emosaac.server.dto.genre.UserResearchRequest;
import com.emosaac.server.dto.recommand.UserBaseCfDto;
import com.emosaac.server.security.CurrentUser;
import com.emosaac.server.security.UserPrincipal;
import com.emosaac.server.service.genre.GenreService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/genres")
@RequiredArgsConstructor
@Api(tags = {"장르 컨트롤러"})
public class genreController {

    private final GenreService genreService;
    RestTemplate restTemplate = new RestTemplate();

    ////<---장르 조회
    @GetMapping()
    @ApiOperation(value = "장르 조회", notes = "장르를 list로 반환 / typeCode:0이면 웹툰/1:소설")
    public ResponseEntity<CommonResponse> getBookGenre(@RequestParam(value = "typeCode") int typeCode) {

        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "장르 조회 성공", genreService.getBookGenre(typeCode)));
    }

    ////--->

    ////<----설문조사
    @GetMapping("/research")
    @ApiOperation(value = "설문조사 질문 조회", notes = "설문조사 북 리스트를 반환 / typeCode:0이면 웹툰/1:소설")
    public ResponseEntity<CommonResponse> getResearch(@RequestParam(value = "typeCode") int typeCode) {

        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "설문조사 조회 성공", genreService.getResearch(typeCode)));
    }

    ///////

    @PostMapping("/research")
    @ApiOperation(value = "설문조사 수행", notes = "선호 장르 리스트를 반환, 0: 웹툰/1:소설, 수행 결과는 /users/me api로 컬럼 갱신됐는지 확인")
    public ResponseEntity<CommonResponse> postResearch(@ApiIgnore @CurrentUser UserPrincipal userPrincipal,
                                                       @RequestBody @Valid UserResearchRequest request) {

        GenreResponseList genreResponseList = genreService.postResearch(userPrincipal.getId(), request);
        //장고로 요청
        requestToDjango(userPrincipal.getId());

        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "설문조사 성공", genreResponseList));
    }

    void requestToDjango(Long userId) {
        //cf By New User
        String cfUrl = "http://j8d203.p.ssafy.io:8000/recommand/cf/" + userId;
        UserBaseCfDto cfResponse = restTemplate.getForObject(cfUrl, UserBaseCfDto.class);

//        predict By New User
        String predictUrl = "http://j8d203.p.ssafy.io:8000/recommand/predict/" + userId;
        UserBaseCfDto predictResponse = restTemplate.getForObject(predictUrl, UserBaseCfDto.class);
//        System.out.println(response);

    }


    ////<---통계
    @GetMapping("/total/amounts")
    @ApiOperation(value = "나의 장르별 읽음 통계 조회", notes = "장르별 읽음 수치 리스트를 반환 / typeCode: 0 : 웹툰/1:소설")
    public ResponseEntity<CommonResponse> getTotalAmount(@ApiIgnore @CurrentUser UserPrincipal userPrincipal,
                                                         @RequestParam(value = "typeCode") int typeCode) {

        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "장르별 통계 수치 조회 성공", genreService.getTotalAmount(userPrincipal.getId(), typeCode)));
    }

    @GetMapping("/total/genres")
    @ApiOperation(value = "통계기반 선호/비선호 장르 조회 *test용입니다*", notes = " typeCode:0: 웹툰/1:소설")
    public ResponseEntity<CommonResponse> getTotalGenre(@ApiIgnore @CurrentUser UserPrincipal userPrincipal,
                                                        @RequestParam(value = "typeCode") int typeCode,
                                                        @RequestParam(value = "isLike") int isLike) {

        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "통계 기반 선호/비선호 장르 조회 성공", genreService.getTotalGenre(userPrincipal.getId(), typeCode, isLike)));
    }

    @GetMapping("/total/one")
    @ApiOperation(value = "통계기반 선호/비선호 탑 2 장르별 랜덤 조회 , count 개수만큼 줍니다", notes = "typeCode: 0: 웹툰, 1:소설 / order: 순위(1,2,3)/ count: 반환할 책 개수")
    public ResponseEntity<CommonResponse> getTotalUnlikeGenreBook(@ApiIgnore @CurrentUser UserPrincipal userPrincipal,
                                                                  @RequestParam(value = "typeCode") int typeCd,
                                                                  @RequestParam(value = "isLike", defaultValue = "0") int isLike,
                                                                  @RequestParam(value = "count", defaultValue = "1") int count) {

        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "장르별 선호/비선호 장르 탑2 책 랜덤 조회 성공", genreService.getTotalGenreBookCount(userPrincipal.getId(), typeCd, isLike, count)));
    }



    @GetMapping("/total/like")
    @ApiOperation(value = "선호 장르별 책 조회", notes = " typeCode: 0: 웹툰, 1:소설 / order: 순위(1,2,3)")
    public ResponseEntity<CommonResponse> getTotalLikeGenreBook(@ApiIgnore @CurrentUser UserPrincipal userPrincipal,
                                                                @RequestParam(value = "typeCode") int typeCd,
                                                                @RequestParam(value = "order") int order,
                                                                @ApiIgnore @RequestParam(value = "isLike", defaultValue = "0") int isLike,
                                                                @RequestParam(value = "size", required = false, defaultValue = "10")
                                                                int size,
                                                                @RequestParam(value = "prevId", required = false, defaultValue = "0")
                                                                Long prevId,
                                                                @RequestParam(value = "prevScore", required = false, defaultValue = "10")
                                                                Double prevScore) {

        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "장르별 선호 책 조회 성공",
                genreService.getTotalLikeGenreBook(userPrincipal.getId(), BookRequest.of(typeCd, size, prevId, prevScore, isLike, order))));
    }

}
