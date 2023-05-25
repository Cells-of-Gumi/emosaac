package com.emosaac.server.dto.genre;

import com.emosaac.server.domain.book.Genre;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GenreResponseList {

    List<GenreResponse> webtoon;

    List<GenreResponse> novel;

}
