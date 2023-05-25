package com.emosaac.server.dto.user;

import com.emosaac.server.domain.book.Genre;
import com.emosaac.server.domain.user.User;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserGenreResponse {

//    private String userId;

    private List<Map<Object, Object>> webtoonGenre;

    private List<Map<Object, Object>> novelGenre;


    public static UserGenreResponse from(Map<Object, Object> mapWebtoon, Map<Object, Object> mapNovel) {
        List<Map<Object, Object>> tmpWebtoon = new ArrayList<>();
        List<Map<Object, Object>> tmpNovel = new ArrayList<>();

        tmpWebtoon.add(mapWebtoon);
        tmpNovel.add(mapNovel);
        return new UserGenreResponse(tmpWebtoon, tmpNovel);
    }
}
