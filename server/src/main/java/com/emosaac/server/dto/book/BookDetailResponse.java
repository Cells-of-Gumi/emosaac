package com.emosaac.server.dto.book;

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
public class BookDetailResponse {
    private Long bookId;
    private int platform;
    private String thumbnail;
    private String title;
    private String author;
    private String href;
    private String story;
    private String tag;
    private String genre;
    private String regist;
    private String grade;
    private double avgScore;
    private Integer hit;
    private String day;
    private boolean bookmark;
    private boolean read;
    private double myScore;

    @QueryProjection
    public BookDetailResponse(Book book, boolean bookmarkStatus, boolean readStatus, double myScore){
        this.bookId = book.getBookId();
        this.platform = book.getPlatform();
        this.thumbnail = book.getThumbnail();
        this.title = book.getTitle().replaceAll("휴재$", "");
        this.author = book.getAuthor();
        this.href = book.getHref();
        this.story = book.getStory();
        this.tag = book.getTag();
        this.genre = book.getGenre().getName();
        this.grade = book.getGrade();
        this.regist = book.getRegist();
        this.hit = book.getHit();
        this.day = book.getDay();

        this.avgScore = Double.parseDouble(String.format("%.2f", book.getScore()));

        this.bookmark = bookmarkStatus;
        this.read = readStatus;
        this.myScore = myScore;
    }

}
