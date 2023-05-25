package com.emosaac.server.domain.emo;

import com.emosaac.server.domain.BaseEntity;
import com.emosaac.server.domain.book.Book;
import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.emopick.EmopickSaveRequest;
import com.vladmihalcea.hibernate.type.json.JsonStringType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DynamicUpdate
@TypeDef(name = "json", typeClass = JsonStringType.class)
public class EmopickDetail extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DETAIL_NO")
    private Long detailNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "EMOPICK_NO")
    private Emopick emopick;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BOOK_NO")
    private Book book;

    @Column(columnDefinition="TEXT")
    private String review;

    @Column(name = "TYPE_CD")
    private Integer type; //0: 웹툰, 1: 웹소설

    @Builder
    public EmopickDetail(Emopick emopick, Book book, String review, Integer type){
        this.emopick = emopick;
        this.book = book;
        this.review = review;
        this.type = type;
    }

    public void update(Book book, String review, Integer type){
        this.book = book;
        this.review = review;
        this.type = type;
    }

}
