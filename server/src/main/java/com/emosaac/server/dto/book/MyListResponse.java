package com.emosaac.server.dto.book;

import com.emosaac.server.domain.book.Book;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class MyListResponse {
    private Long bookId;
    private int platform;
    private String thumbnail;
    private String title;
    private String author;
    private String href;
    private String tag;
    private double avgScore;
    private Integer hit;
    private String regist;
    private Long genreId;
    private String genreName;
    private int typeCd;
    private double myScore;
    private String modifiedDate;

    @QueryProjection
    public MyListResponse(Book book, LocalDateTime modifiedDate){
        this.bookId = book.getBookId();
        this.platform = book.getPlatform();
        this.thumbnail = book.getThumbnail();
        this.title = book.getTitle();
        this.author = book.getAuthor();
        this.href = book.getHref();
        //<----추가
        this.tag = book.getTag();

        this.avgScore = Double.parseDouble(String.format("%.2f", book.getScore()));

        this.hit = book.getHit();
        this.regist = book.getRegist();
        this.genreId = book.getGenre().getGerneId();
        this.genreName = book.getGenre().getName();

        this.typeCd = book.getType();

        this.modifiedDate = String.valueOf(modifiedDate);
    }

    @QueryProjection
    public MyListResponse(Book book, Double myScore, LocalDateTime modifiedDate){
        this.bookId = book.getBookId();
        this.platform = book.getPlatform();
        this.thumbnail = book.getThumbnail();
        this.title = book.getTitle();
        this.author = book.getAuthor();
        this.href = book.getHref();
        //<----추가
        this.tag = book.getTag();

        this.avgScore = Double.parseDouble(String.format("%.2f", book.getScore()));

        this.hit = book.getHit();
        this.regist = book.getRegist();
        this.genreId = book.getGenre().getGerneId();
        this.genreName = book.getGenre().getName();

        this.typeCd = book.getType();

        this.myScore = myScore;

        this.modifiedDate = String.valueOf(modifiedDate);
    }



}