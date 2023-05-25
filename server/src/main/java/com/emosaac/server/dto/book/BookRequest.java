package com.emosaac.server.dto.book;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class BookRequest {

    private int typeCd;

    private String criteria;

    private int size;

    private Long prevId;

    private Double prevScore;

    private Long genreCode;

    private int isLike;

    private int order;

   public BookRequest(int typeCd, String criteria, int size, Long prevId, Double prevScore, Long genreCode) {
        this.typeCd = typeCd;
        this.criteria = criteria;
        this.size = size;
        this.prevId = prevId;
        this.prevScore = prevScore;
        this.genreCode = genreCode;
    }

    public BookRequest(int typeCd, String criteria, int size, Long prevId, Double prevScore) {
        this.typeCd = typeCd;
        this.criteria = criteria;
        this.size = size;
        this.prevId = prevId;
        this.prevScore = prevScore;
    }

    public BookRequest(int typeCd, String criteria, int size, Long prevId, Double prevScore, int isLike, int order) {
        this.typeCd = typeCd;
        this.criteria = criteria;
        this.size = size;
        this.prevId = prevId;
        this.prevScore = prevScore;
        this.isLike = isLike;
        this.order = order;
    }

    public BookRequest(int typeCd, int size, Long prevId, Double prevScore, int isLike, int order) {
        this.typeCd = typeCd;
        this.size = size;
        this.prevId = prevId;
        this.prevScore = prevScore;
        this.isLike = isLike;
        this.order = order;
    }

    public static BookRequest of(int typeCd, int size, Long prevId, Double prevScore, int isLike, int  order) {
        return new BookRequest(typeCd, size, prevId, prevScore, isLike, order);
    }



    public static BookRequest of(int typeCd, String criteria, int size, Long prevId, Double prevScore, Long genreCode) {
        return new BookRequest(typeCd, criteria,size, prevId, prevScore, genreCode);
    }

    public static BookRequest of(int typeCd, String criteria, int size, Long prevId, Double prevScore) {
        return new BookRequest(typeCd, criteria,size, prevId, prevScore);
    }

    public static BookRequest of(int typeCd, String criteria, int size, Long prevId, Double prevScore, int isLike, int order) {
        return new BookRequest(typeCd, criteria,size, prevId, prevScore, isLike, order);
    }


}
