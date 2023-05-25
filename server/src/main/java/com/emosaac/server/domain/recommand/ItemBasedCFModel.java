package com.emosaac.server.domain.recommand;

import com.emosaac.server.domain.BaseEntity;
import com.emosaac.server.domain.book.Book;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name="ItemBasedCFModel")
public class ItemBasedCFModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ITEM_NO")
    private Integer id;

    // search_log - book
    @JsonManagedReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="BOOK_NO")
    private Book book;

    @JsonManagedReference
    private String bookNoList;

    @Column(name="TYPE_CD")
    private Integer typeCode;
}