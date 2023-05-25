package com.emosaac.server.dto.book;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class PlatformResponse {
    private List<BookListResponse> kakao;
    private List<BookListResponse> naver;
    private List<BookListResponse> ridi;

    public PlatformResponse(List<BookListResponse> kakao, List<BookListResponse> naver, List<BookListResponse> ridi){
        this.kakao = kakao;
        this.naver = naver;
        this.ridi = ridi;
    }
}
