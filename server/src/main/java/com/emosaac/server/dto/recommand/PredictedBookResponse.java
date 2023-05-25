package com.emosaac.server.dto.recommand;

import com.emosaac.server.domain.book.Book;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class PredictedBookResponse {
    private Long bookId;
    private int platform;
    private String thumbnail;
    private String title;
    private String author;
    private String href;
    private double avgScore;
    private Integer hit;
    private String regist;
    private Long genreId;
    private String genreName;
    private int typeCd;
    private double predictScore;

    @QueryProjection
    public PredictedBookResponse(Book book, double predictScore){
        this.bookId = book.getBookId();
        this.platform = book.getPlatform();
        this.thumbnail = book.getThumbnail();
        this.title = book.getTitle();
        this.author = book.getAuthor();
        this.href = book.getHref();
        //<----추가
        this.avgScore = book.getScore();
        this.hit = book.getHit();
        this.regist = book.getRegist();
        this.genreId = book.getGenre().getGerneId();
        this.genreName = book.getGenre().getName();

        this.typeCd = book.getType();

        this.predictScore = predictScore;
    }



}