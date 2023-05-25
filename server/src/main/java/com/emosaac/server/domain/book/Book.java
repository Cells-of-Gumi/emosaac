package com.emosaac.server.domain.book;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DynamicUpdate
@Table(name = "book")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BOOK_NO")
    private Long bookId;

    private String author;

    private String title;

    private String thumbnail;

    @Column(columnDefinition = "TEXT")
    private String day;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "GENRE_CD")
    private Genre genre;

    @Column(columnDefinition = "TEXT")
    private String story;

    @Column(columnDefinition = "TEXT")
    private String tag;

    private String views;//플랫폼에서 가져온 조회수

    private String grade; // 플랫폼에서 가져온 평점
/*
1: kakao
2: naver
4: ridi

3: kakao, naver
5: kakao, ridi
6: naver, ridi

7: kakao, naver, ridi
*/
    @Column(name = "PLAT_CD")
    private Integer platform;

    private String series; //현재까지 총 몇 편인지

    private String href; //플랫폼 작품 주소

    @Column(name = "TYPE_CD")
    private Integer type; //0: 웹툰, 1: 웹소설

    private double score; //우리 페이지 사용자가 체점 평균

    private Integer hit; //우리 사이트에서 조회수

    private String regist; //1화 등록 날짜

    @Embedded
    private final BookmarkList bookmarkList = new BookmarkList();

    @Embedded
    private final ReadBookList readBookList = new ReadBookList();

    @Embedded
    private final ScoreList scoreList = new ScoreList();

    public void addHit() {
        this.hit = this.hit+1;
    }

    public boolean toggleBookmark(BookMark bookmark) {
        return bookmarkList.toggleBookmark(bookmark);
    }
    public boolean toggleReadBook(ReadBook readBook) {
        return readBookList.toggleBookmark(readBook);
    }

    public Double setScore(Score score){
        return scoreList.setScore(score);
    }
    public void setAvgScore(){
        this.score = scoreList.getAvgScore();
    }
}

