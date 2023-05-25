package com.emosaac.server.dto.emopick;

import com.emosaac.server.domain.book.Book;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ThumbnailListResponse {
    String thumbnail;

    @QueryProjection
    public ThumbnailListResponse(Book book){
        this.thumbnail = book.getThumbnail();
    }
}
