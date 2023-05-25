package com.emosaac.server.dto.genre;

import com.emosaac.server.domain.book.Genre;
import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.user.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GenreResponse {

    private Long genreId;
    private String name;

    public GenreResponse(Genre genre) {
        this.genreId = genre.getGerneId();
        this.name = genre.getName();
    }

}
