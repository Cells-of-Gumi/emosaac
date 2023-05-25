package com.emosaac.server.dto.genre;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class TotalResponse {
    private Long genreId;
    private String genreName;
    private Long count = 0L;
    private String description;

    public TotalResponse(Long genreId, String genreName, Long count) {
        this.genreId = genreId;
        this.genreName = genreName;
        this.count = count;
    }
}
