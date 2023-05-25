package com.emosaac.server.domain.recommand;

import javax.persistence.*;

import com.emosaac.server.domain.book.Book;
import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="BestBook30Model")
public class BestBook30Model {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="BEST_NO")
    private Integer bestBookId;

    // book-bookGrade
    @JsonBackReference
    @OneToOne
    @JoinColumn(name="BOOK_NO")
    Book book;
}
